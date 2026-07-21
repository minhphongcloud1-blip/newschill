'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Key, Eye, EyeOff, CheckCircle2, XCircle,
  Sparkles, Save, FlaskConical, RotateCcw, Cpu, Zap,
} from 'lucide-react';
import {
  AdminPageHeader, AdminButton, AdminFormField,
  AdminBadge, AdminTabs,
} from '@/components/admin/AdminUI';

type ProviderKey = 'gemini' | 'openai';

interface ProviderModel { id: string; label: string; description: string; badge?: string; }
interface ProviderConfig {
  key: ProviderKey; name: string; logo: string; color: string;
  apiKeyPlaceholder: string; docsUrl: string; models: ProviderModel[];
}
interface AiConfig {
  activeProvider: ProviderKey;
  gemini: { apiKey: string; model: string };
  openai: { apiKey: string; model: string };
  systemPrompt: string; maxTokens: number; temperature: number;
}

const PROVIDERS: ProviderConfig[] = [
  {
    key: 'gemini', name: 'Google Gemini', logo: '✨', color: '#4285F4',
    apiKeyPlaceholder: 'AIza...', docsUrl: 'https://aistudio.google.com/app/apikey',
    models: [
      { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite', description: 'Nhanh & rẻ nhất', badge: 'Khuyến nghị' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', description: 'Cân bằng tốc độ / chất lượng' },
      { id: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', description: 'Ổn định, phù hợp free tier' },
      { id: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', description: 'Context window lớn (2M token)' },
    ],
  },
  {
    key: 'openai', name: 'OpenAI ChatGPT', logo: '🤖', color: '#10A37F',
    apiKeyPlaceholder: 'sk-proj-...', docsUrl: 'https://platform.openai.com/api-keys',
    models: [
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Rẻ & nhanh, phù hợp sản xuất', badge: 'Khuyến nghị' },
      { id: 'gpt-4o', label: 'GPT-4o', description: 'Chất lượng cao nhất' },
      { id: 'gpt-4-turbo', label: 'GPT-4 Turbo', description: 'Context 128K token' },
      { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Siêu nhanh, chi phí thấp nhất' },
    ],
  },
];

const DEFAULT_PROMPT = `Bạn là biên tập viên tin tức. Đầu vào là nội dung bài báo gốc.

Nhiệm vụ:
1. Chỉ sử dụng thông tin có trong bài viết.
2. Tuyệt đối KHÔNG thêm bất kỳ thông tin, nhận định hoặc suy luận nào.
3. Không tự bổ sung số liệu.
4. Không dự đoán.
5. Không viết theo ý kiến cá nhân.
6. Giữ nguyên ý nghĩa bài gốc.
7. Tóm tắt khoảng 30-50% độ dài.
8. Xuất HTML.

Định dạng nội dung:
<h2>Mở đầu</h2>
<p>...</p>
<h2>Chi tiết</h2>
<p>...</p>
<ul><li>...</li></ul>
Nếu bài có nhiều mục thì chia thành nhiều h2.

Trả về JSON với cấu trúc sau (BẮT BUỘC):
{
  "title": "Giữ nguyên hoặc rút gọn tối đa 5-10% tiêu đề gốc",
  "excerpt": "Tóm tắt 1-2 câu ngắn gọn nội dung chính",
  "content": "<h2>Mở đầu</h2><p>...</p><h2>Chi tiết</h2><p>...</p>"
}`;

const DEFAULT_CONFIG: AiConfig = {
  activeProvider: 'gemini',
  gemini: { apiKey: '', model: 'gemini-2.0-flash-lite' },
  openai: { apiKey: '', model: 'gpt-4o-mini' },
  systemPrompt: DEFAULT_PROMPT,
  maxTokens: 2048,
  temperature: 0.7,
};




export default function AiConfigPage() {
  const [config, setConfig] = useState<AiConfig>(DEFAULT_CONFIG);
  const [showKey, setShowKey] = useState<Record<ProviderKey, boolean>>({ gemini: false, openai: false });
  const [testStatus, setTestStatus] = useState<Record<ProviderKey, 'idle' | 'testing' | 'ok' | 'fail' | 'quota'>>({
    gemini: 'idle', openai: 'idle',
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('providers');

  const loadConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/ai-settings');
      const { data } = await res.json();
      if (data) {
        setConfig({
          activeProvider: data.active_provider ?? 'gemini',
          gemini: { apiKey: data.gemini_api_key ?? '', model: data.gemini_model ?? 'gemini-2.0-flash-lite' },
          openai: { apiKey: data.openai_api_key ?? '', model: data.openai_model ?? 'gpt-4o-mini' },
          systemPrompt: data.system_prompt ?? DEFAULT_PROMPT,
          maxTokens: data.max_tokens ?? 2048,
          temperature: data.temperature ?? 0.7,
        });
      }
    } catch { /* use defaults */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadConfig(); }, [loadConfig]);

  const updateProvider = (provider: ProviderKey, field: 'apiKey' | 'model', value: string) => {
    setConfig((prev) => ({ ...prev, [provider]: { ...prev[provider], [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const err = await res.json();
        alert('Lỗi lưu cấu hình: ' + (err.error || 'Unknown'));
      }
    } catch (e) {
      alert('Lỗi kết nối: ' + (e instanceof Error ? e.message : 'Unknown'));
    }
    setSaving(false);
  };

  const handleTest = async (providerKey: ProviderKey) => {
    const apiKey = config[providerKey].apiKey.trim();
    const model = config[providerKey].model;
    if (!apiKey) return;
    setTestStatus((s) => ({ ...s, [providerKey]: 'testing' }));
    try {
      let status = 0;
      if (providerKey === 'gemini') {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'Hi' }] }] }),
          }
        );
        status = res.status;
      } else {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Hi' }], max_tokens: 5 }),
        });
        status = res.status;
      }

      if (status === 200) {
        setTestStatus((s) => ({ ...s, [providerKey]: 'ok' }));
      } else if (status === 429) {
        setTestStatus((s) => ({ ...s, [providerKey]: 'quota' }));
      } else {
        setTestStatus((s) => ({ ...s, [providerKey]: 'fail' }));
      }
    } catch (e) {
      setTestStatus((s) => ({ ...s, [providerKey]: 'fail' }));
      alert(`Lỗi kết nối: ${e instanceof Error ? e.message : 'Unknown'}`);
    }
    setTimeout(() => setTestStatus((s) => ({ ...s, [providerKey]: 'idle' })), 5000);
  };

  const handleReset = () => {
    if (window.confirm('Đặt lại prompt về mặc định?')) {
      setConfig((prev) => ({ ...prev, systemPrompt: DEFAULT_PROMPT }));
    }
  };

  const activeProviderConfig = PROVIDERS.find((p) => p.key === config.activeProvider)!;

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        icon={<Bot className="w-5 h-5" style={{ color: '#8B5CF6' }} />}
        title="Cấu hình AI"
        subtitle="Kết nối nhà cung cấp AI để tự động tóm tắt và tạo bài viết từ RSS"
        action={
          <AdminButton
            variant="primary"
            icon={saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu cấu hình'}
          </AdminButton>
        }
      />

      <AdminTabs
        tabs={[
          { key: 'providers', label: '🔑 API Keys & Providers' },
          { key: 'prompt', label: '📝 System Prompt' },
          { key: 'advanced', label: '⚙️ Nâng cao' },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <AnimatePresence mode="wait">

        {activeTab === 'providers' && (
          <motion.div key="providers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

            {/* Step 1 — pick ONE provider */}
            <div className="rounded-2xl p-5 space-y-3" style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Chọn nhà cung cấp AI</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Chỉ một AI được dùng tại một thời điểm. Bài viết sẽ được ghi nhận chạy từ AI đang chọn.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PROVIDERS.map((p) => {
                  const isActive = config.activeProvider === p.key;
                  const hasKey = !!config[p.key].apiKey;
                  return (
                    <motion.button
                      key={p.key}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfig((prev) => ({ ...prev, activeProvider: p.key }))}
                      className="relative flex items-center gap-3 p-4 rounded-xl text-left border-2 transition-all"
                      style={{
                        borderColor: isActive ? p.color : 'var(--border-primary)',
                        background: isActive ? `${p.color}10` : 'var(--bg-primary)',
                      }}
                    >
                      {/* Radio dot */}
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                        style={{ borderColor: isActive ? p.color : 'var(--border-light)' }}
                      >
                        {isActive && <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />}
                      </div>
                      <span className="text-xl">{p.logo}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm leading-tight" style={{ color: isActive ? p.color : 'var(--text-primary)' }}>{p.name}</p>
                        <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
                          {hasKey ? `✓ API key đã cấu hình · ${config[p.key].model}` : 'Chưa có API key'}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 — config panel for ACTIVE provider only */}
            <AnimatePresence mode="wait">
              {PROVIDERS.filter((p) => p.key === config.activeProvider).map((provider) => (
                <motion.div
                  key={provider.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: `1.5px solid ${provider.color}50` }}
                >
                  {/* Header */}
                  <div className="px-5 py-3 flex items-center justify-between"
                    style={{ background: `${provider.color}08`, borderBottom: `1px solid ${provider.color}20` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{provider.logo}</span>
                      <span className="font-bold text-sm" style={{ color: provider.color }}>{provider.name}</span>
                      <AdminBadge variant="purple">Đang hoạt động</AdminBadge>
                    </div>
                    <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium underline" style={{ color: provider.color }}>
                      Lấy API Key →
                    </a>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* API Key */}
                    <AdminFormField label="API Key" required>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                        <input
                          type={showKey[provider.key] ? 'text' : 'password'}
                          value={config[provider.key].apiKey}
                          onChange={(e) => updateProvider(provider.key, 'apiKey', e.target.value)}
                          placeholder={provider.apiKeyPlaceholder}
                          className="w-full h-10 pl-9 pr-28 rounded-xl text-sm outline-none transition-all font-mono"
                          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
                          onFocus={(e) => (e.target.style.borderColor = provider.color)}
                          onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button type="button"
                            onClick={() => setShowKey((s) => ({ ...s, [provider.key]: !s[provider.key] }))}
                            className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-md)]" style={{ color: 'var(--text-secondary)' }}
                          >
                            {showKey[provider.key] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button type="button"
                            onClick={() => handleTest(provider.key)}
                            disabled={!config[provider.key].apiKey || testStatus[provider.key] === 'testing'}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold disabled:opacity-40 transition-all"
                            style={{ background: `${provider.color}18`, color: provider.color }}
                          >
                            {testStatus[provider.key] === 'testing'
                              ? <><FlaskConical className="w-3 h-3 animate-spin" />Test...</>
                              : <><FlaskConical className="w-3 h-3" />Test</>
                            }
                          </button>
                        </div>
                      </div>
                      <AnimatePresence>
                        {testStatus[provider.key] === 'ok' && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs mt-1.5 flex items-center gap-1 text-green-500">
                            <CheckCircle2 className="w-3 h-3" /> Kết nối thành công! Key hợp lệ.
                          </motion.p>
                        )}
                        {testStatus[provider.key] === 'quota' && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#F59E0B' }}>
                            <span className="w-3 h-3 text-base leading-none">⚠️</span> Key đúng nhưng hết quota — nạp thêm tiền vào tài khoản {provider.key === 'gemini' ? 'Google AI' : 'OpenAI'} để tiếp tục.
                          </motion.p>
                        )}
                        {testStatus[provider.key] === 'fail' && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs mt-1.5 flex items-center gap-1 text-red-500">
                            <XCircle className="w-3 h-3" /> API key không hợp lệ hoặc đã bị khóa. Kiểm tra lại.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </AdminFormField>

                    {/* Model selector */}
                    <AdminFormField label="Model">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {provider.models.map((model) => {
                          const isSelected = config[provider.key].model === model.id;
                          return (
                            <button key={model.id} type="button"
                              onClick={() => updateProvider(provider.key, 'model', model.id)}
                              className="text-left p-3 rounded-xl border-2 transition-all"
                              style={{
                                borderColor: isSelected ? provider.color : 'var(--border-primary)',
                                background: isSelected ? `${provider.color}08` : 'var(--bg-secondary)',
                              }}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-semibold" style={{ color: isSelected ? provider.color : 'var(--text-primary)' }}>{model.label}</span>
                                {model.badge && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${provider.color}20`, color: provider.color }}>{model.badge}</span>
                                )}
                              </div>
                              <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{model.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </AdminFormField>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'prompt' && (
          <motion.div key="prompt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>System Prompt</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Đây là hướng dẫn gửi tới AI mỗi khi xử lý bài từ RSS. Prompt quyết định phong cách, độ dài và định dạng đầu ra.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Nội dung prompt</label>
                <button onClick={handleReset} className="flex items-center gap-1 text-xs hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                  <RotateCcw className="w-3 h-3" /> Đặt lại mặc định
                </button>
              </div>
              <textarea
                value={config.systemPrompt}
                onChange={(e) => setConfig((prev) => ({ ...prev, systemPrompt: e.target.value }))}
                rows={20}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y font-mono"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  lineHeight: '1.7',
                  minHeight: '360px',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                placeholder="Viết hướng dẫn cho AI..."
              />
              <p className="text-xs mt-1.5 text-right" style={{ color: 'var(--text-secondary)' }}>{config.systemPrompt.length} ký tự</p>
            </div>

            <div className="rounded-xl p-4 space-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Biến có thể dùng trong prompt</p>
              <div className="flex flex-wrap gap-2">
                {['{{title}}', '{{content}}', '{{source}}', '{{url}}', '{{date}}'].map((v) => (
                  <code key={v} className="text-xs px-2 py-0.5 rounded-md font-mono" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>{v}</code>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'advanced' && (
          <motion.div key="advanced" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="rounded-2xl p-5 space-y-6" style={{ border: '1px solid var(--border-primary)', background: 'var(--bg-secondary)' }}>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Tham số sinh văn bản</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Max Tokens</label>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#8B5CF6' }}>{config.maxTokens}</span>
                </div>
                <input type="range" min={256} max={8192} step={256} value={config.maxTokens}
                  onChange={(e) => setConfig((p) => ({ ...p, maxTokens: +e.target.value }))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  <span>256 (ngắn)</span><span>8192 (dài)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Temperature
                    <span className="ml-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      ({config.temperature <= 0.3 ? 'Chính xác' : config.temperature <= 0.7 ? 'Cân bằng' : 'Sáng tạo'})
                    </span>
                  </label>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#F97316' }}>{config.temperature.toFixed(1)}</span>
                </div>
                <input type="range" min={0} max={2} step={0.1} value={config.temperature}
                  onChange={(e) => setConfig((p) => ({ ...p, temperature: +e.target.value }))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  <span>0 (chính xác)</span><span>2 (sáng tạo)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ border: '1px solid var(--border-primary)' }}>
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Cấu hình hiện tại</p>
              <div className="space-y-2 text-sm">
                {[
                  ['Provider', activeProviderConfig.name, activeProviderConfig.color],
                  ['Model', config[config.activeProvider].model, 'var(--text-primary)'],
                  ['Max Tokens', String(config.maxTokens), 'var(--text-primary)'],
                  ['Temperature', String(config.temperature), 'var(--text-primary)'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border-primary)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span className="font-semibold" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2 z-50 shadow-lg"
            style={{ background: '#22C55E' }}
          >
            <CheckCircle2 className="w-4 h-4" /> Cấu hình đã lưu thành công!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
