'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Key, Eye, EyeOff, CheckCircle2, XCircle,
  Sparkles, Save, FlaskConical, RotateCcw, Cpu, Zap,
  RefreshCw, ChevronDown
} from 'lucide-react';
import {
  AdminPageHeader, AdminButton, AdminFormField,
  AdminBadge, AdminTabs,
} from '@/components/admin/AdminUI';

type ProviderKey = 'gemini' | 'openai' | 'openrouter';

interface ProviderModel { id: string; label: string; description: string; badge?: string; }
interface ProviderConfig {
  key: ProviderKey; name: string; logo: string; color: string;
  apiKeyPlaceholder: string; docsUrl: string; models: ProviderModel[];
}
interface AiConfig {
  activeProvider: ProviderKey;
  gemini: { apiKey: string; model: string };
  openai: { apiKey: string; model: string };
  openrouter: { apiKey: string; model: string };
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
  {
    key: 'openrouter', name: 'OpenRouter', logo: '🌌', color: '#6366F1',
    apiKeyPlaceholder: 'sk-or-v1-...', docsUrl: 'https://openrouter.ai/keys',
    models: [
      { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'Nhanh, thông minh, free', badge: 'Khuyến nghị' },
      { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', description: 'Cực thông minh, logic tốt' },
      { id: 'deepseek/deepseek-chat', label: 'DeepSeek V3', description: 'Rẻ, chất lượng ngang GPT-4' },
      { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', description: 'Mã nguồn mở hàng đầu' },
    ],
  },
];

const DEFAULT_PROMPT = `Bạn là biên tập viên tin tức. Bạn nhận được Tiêu đề và Nội dung bài báo gốc.
Nhiệm vụ: TÓM TẮT NGẮN GỌN, SÚC TÍCH.

Các quy tắc TỐI QUAN TRỌNG:
1. ĐỘ DÀI: Tóm tắt LUÔN PHẢI NGẮN HƠN bài gốc (chỉ bằng 20% - 30% độ dài văn bản gốc). Tuyệt đối không tự viết dài thêm hoặc lặp ý.
2. SỰ THẬT: Chỉ dùng dữ liệu có trong bài. KHÔNG BỊA ĐẶT, KHÔNG THÊM THẮT, KHÔNG BÌNH LUẬN.
3. NGÔN NGỮ: Giọng văn báo chí, khách quan, trực diện.

Định dạng nội dung HTML (content):
- Dùng thẻ HTML cơ bản: <h2>, <p>, <ul>, <li>.
- KHÔNG gượng ép chia quá nhiều mục nếu bài quá ngắn. Chỉ dùng 1-2 thẻ <h2> nếu bài đủ dài và cần thiết.

Trả về JSON ĐÚNG cấu trúc sau (BẮT BUỘC):
{
  "title": "Tiêu đề hấp dẫn, khách quan, giữ ý chính gốc",
  "excerpt": "1-2 câu tóm tắt nội dung cốt lõi nhất (dưới 250 ký tự)",
  "content": "<h2>...</h2><p>...</p>"
}`;

const DEFAULT_CONFIG: AiConfig = {
  activeProvider: 'gemini',
  gemini: { apiKey: '', model: 'gemini-2.0-flash-lite' },
  openai: { apiKey: '', model: 'gpt-4o-mini' },
  openrouter: { apiKey: '', model: 'google/gemini-2.5-flash' },
  systemPrompt: DEFAULT_PROMPT,
  maxTokens: 2048,
  temperature: 0.7,
};




export default function AiConfigPage() {
  const [config, setConfig] = useState<AiConfig>(DEFAULT_CONFIG);
  const [showKey, setShowKey] = useState<Record<ProviderKey, boolean>>({ gemini: false, openai: false, openrouter: false });
  const [testStatus, setTestStatus] = useState<Record<ProviderKey, 'idle' | 'testing' | 'ok' | 'fail' | 'quota'>>({
    gemini: 'idle', openai: 'idle', openrouter: 'idle'
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('providers');

  // --- OpenRouter Dynamic Models State ---
  const [orModels, setOrModels] = useState<any[]>([]);
  const [orSearch, setOrSearch] = useState('');
  const [orDropdownOpen, setOrDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (config.activeProvider === 'openrouter' && orModels.length === 0) {
      fetch('/api/admin/openrouter/sync')
        .then(res => res.json())
        .then(res => setOrModels(res.data || []))
        .catch(() => {});
    }
  }, [config.activeProvider, orModels.length]);

  const handleSyncOpenRouter = async () => {
    const apiKey = config.openrouter.apiKey;
    if (!apiKey) return alert('Vui lòng nhập API Key trước khi đồng bộ!');
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/openrouter/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetch('/api/admin/openrouter/sync')
          .then(r => r.json())
          .then(r => setOrModels(r.data || []));
      } else {
        alert('Lỗi: ' + data.error);
      }
    } catch (err) {
      alert('Lỗi kết nối đồng bộ');
    }
    setIsSyncing(false);
  };

  const loadConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/ai-settings');
      const { data } = await res.json();
      if (data) {
        setConfig({
          activeProvider: data.active_provider ?? 'gemini',
          gemini: { apiKey: data.gemini_api_key ?? '', model: data.gemini_model ?? 'gemini-2.0-flash-lite' },
          openai: { apiKey: data.openai_api_key ?? '', model: data.openai_model ?? 'gpt-4o-mini' },
          openrouter: { apiKey: data.openrouter_api_key ?? '', model: data.openrouter_model ?? 'google/gemini-2.5-flash' },
          systemPrompt: data.system_prompt || DEFAULT_PROMPT,
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
      } else if (providerKey === 'openai') {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Hi' }], max_tokens: 5 }),
        });
        status = res.status;
      } else {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://newschill.online',
            'X-Title': 'NewsChill',
          },
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
                  className="rounded-2xl overflow-visible relative"
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
                            <span className="w-3 h-3 text-base leading-none">⚠️</span> Key đúng nhưng hết quota — nạp thêm tiền vào tài khoản {provider.key === 'gemini' ? 'Google AI' : provider.key === 'openai' ? 'OpenAI' : 'OpenRouter'} để tiếp tục.
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
                      {provider.key === 'openrouter' ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <button 
                              type="button" onClick={handleSyncOpenRouter} disabled={isSyncing} 
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                              style={{ background: provider.color, color: '#fff' }}
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                              Đồng bộ Models
                            </button>
                            <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                              Kéo 100+ models mới nhất từ OpenRouter
                            </span>
                          </div>
                          
                          <div className="relative">
                            <div 
                              className="w-full p-3 rounded-xl border-2 flex justify-between items-center cursor-pointer transition-all"
                              style={{ 
                                borderColor: orDropdownOpen ? provider.color : 'var(--border-primary)', 
                                background: orDropdownOpen ? `${provider.color}08` : 'var(--bg-secondary)' 
                              }}
                              onClick={() => setOrDropdownOpen(!orDropdownOpen)}
                            >
                              <div className="flex-1 truncate">
                                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                                  {orModels.find(m => m.model_id === config.openrouter.model)?.name || config.openrouter.model}
                                </p>
                                <p className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>
                                  {config.openrouter.model}
                                </p>
                              </div>
                              <ChevronDown className={`w-4 h-4 transition-transform ${orDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            
                            <AnimatePresence>
                              {orDropdownOpen && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                  className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border-2 z-50 flex flex-col" 
                                  style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-primary)', maxHeight: '350px' }}
                                >
                                  <div className="p-2 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                                    <input 
                                      type="text" placeholder="Tìm model (VD: claude, gemini, free...)" 
                                      value={orSearch} onChange={e => setOrSearch(e.target.value)}
                                      className="w-full p-2.5 rounded-lg text-sm outline-none transition-all"
                                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
                                      onFocus={(e) => (e.target.style.borderColor = provider.color)}
                                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-primary)')}
                                    />
                                  </div>
                                  <div className="overflow-y-auto p-2 space-y-1">
                                    {orModels.filter(m => m.name.toLowerCase().includes(orSearch.toLowerCase()) || m.model_id.toLowerCase().includes(orSearch.toLowerCase())).map(m => {
                                      const isSelected = config.openrouter.model === m.model_id;
                                      return (
                                        <button 
                                          key={m.model_id} type="button"
                                          onClick={() => { updateProvider('openrouter', 'model', m.model_id); setOrDropdownOpen(false); }}
                                          className="w-full text-left p-2.5 rounded-lg flex justify-between items-center transition-all"
                                          style={{ background: isSelected ? `${provider.color}15` : 'transparent' }}
                                        >
                                          <div className="min-w-0 flex-1 pr-2">
                                            <p className="text-sm font-semibold truncate" style={{ color: isSelected ? provider.color : 'var(--text-primary)' }}>{m.name}</p>
                                            <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{m.model_id}</p>
                                          </div>
                                          {m.is_free && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: '#22C55E20', color: '#22C55E' }}>
                                              FREE
                                            </span>
                                          )}
                                        </button>
                                      );
                                    })}
                                    {orModels.length === 0 && (
                                      <div className="p-4 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        Chưa có model nào. Hãy đồng bộ!
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ) : (
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
                      )}
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
