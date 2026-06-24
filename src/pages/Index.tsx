import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'chats' | 'media' | 'groups' | 'status' | 'calls';

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
  { id: 'media', label: 'Медиа', icon: 'Image' },
  { id: 'groups', label: 'Группы', icon: 'Users' },
  { id: 'status', label: 'Статусы', icon: 'CircleDot' },
  { id: 'calls', label: 'Звонки', icon: 'Phone' },
];

function Avatar({ children, online, size = 'md' }: { children: React.ReactNode; online?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'lg' ? 'h-16 w-16 text-xl' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-sm';
  return (
    <div className="relative shrink-0">
      <div className={`${s} rounded-full grid place-items-center font-semibold text-background bg-gradient-to-br from-gold to-amber-700 ring-1 ring-gold/30`}>
        {children}
      </div>
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-card" />}
    </div>
  );
}

function EmptyState({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex-1 grid place-items-center px-6 py-16">
      <div className="text-center max-w-xs animate-fade-in">
        <div className="h-16 w-16 rounded-2xl grid place-items-center mx-auto mb-5 gold-border gold-glow">
          <Icon name={icon} size={28} className="text-gold" />
        </div>
        <h3 className="font-display text-2xl gold-text mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

// ───────────────────────── LOGIN ─────────────────────────
function Login({ onEnter }: { onEnter: (phone: string, nick: string) => void }) {
  const [phone, setPhone] = useState('+7 ');
  const [nick, setNick] = useState('');
  const valid = phone.replace(/\D/g, '').length >= 11 && nick.trim().length >= 2;

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
    let body = '+7';
    if (d.length > 1) body += ' (' + d.slice(1, 4);
    if (d.length >= 4) body += ') ' + d.slice(4, 7);
    if (d.length >= 7) body += '-' + d.slice(7, 9);
    if (d.length >= 9) body += '-' + d.slice(9, 11);
    return body;
  };

  return (
    <div className="min-h-screen grain bg-background text-foreground grid place-items-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-amber-700/10 blur-3xl" />

      <div className="w-full max-w-sm relative animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-2xl grid place-items-center gold-border gold-glow mb-4">
            <Icon name="Gem" size={28} className="text-gold" />
          </div>
          <h1 className="font-display text-5xl gold-text tracking-wide leading-none">Prime</h1>
          <p className="text-[11px] text-muted-foreground tracking-[0.35em] uppercase mt-2">Private Messenger</p>
        </div>

        <div className="rounded-3xl bg-card gold-border gold-glow p-7">
          <h2 className="font-display text-2xl mb-1">Вход в клуб</h2>
          <p className="text-sm text-muted-foreground mb-6">Доступ только по приглашению. Введите данные, чтобы продолжить.</p>

          <label className="block text-xs text-muted-foreground mb-1.5 ml-1">Номер телефона</label>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/60 border border-border/60 px-4 py-3.5 mb-4 focus-within:border-gold/60 transition-colors">
            <Icon name="Phone" size={18} className="text-gold shrink-0" />
            <input
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          <label className="block text-xs text-muted-foreground mb-1.5 ml-1">Никнейм</label>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/60 border border-border/60 px-4 py-3.5 mb-6 focus-within:border-gold/60 transition-colors">
            <Icon name="AtSign" size={18} className="text-gold shrink-0" />
            <input
              value={nick}
              onChange={(e) => setNick(e.target.value.replace(/\s/g, ''))}
              placeholder="username"
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          <button
            disabled={!valid}
            onClick={() => onEnter(phone, nick.trim())}
            className="w-full rounded-xl py-3.5 font-semibold bg-gradient-to-br from-gold to-amber-700 text-background gold-glow transition-transform enabled:hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Войти в Prime
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
          <Icon name="ShieldCheck" size={14} className="text-gold" />
          Сквозное шифрование · приватность гарантирована
        </p>
      </div>
    </div>
  );
}

// ───────────────────────── MESSENGER ─────────────────────────
export default function Index() {
  const [user, setUser] = useState<{ phone: string; nick: string } | null>(null);
  const [section, setSection] = useState<Section>('chats');
  const [invite, setInvite] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteLink = useMemo(
    () => (user ? `https://prime.chat/i/${user.nick.toLowerCase()}` : ''),
    [user],
  );

  if (!user) return <Login onEnter={(phone, nick) => setUser({ phone, nick })} />;

  const initials = user.nick.slice(0, 2).toUpperCase();

  const copy = () => {
    navigator.clipboard?.writeText(inviteLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen grain bg-background text-foreground flex flex-col">
      <header className="glass border-b border-border/60 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center gold-border gold-glow">
            <Icon name="Gem" size={20} className="text-gold" />
          </div>
          <div>
            <h1 className="font-display text-2xl leading-none gold-text tracking-wide">Prime</h1>
            <p className="text-[11px] text-muted-foreground tracking-[0.3em] uppercase">Private Messenger</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setInvite(true)}
            className="group flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 gold-border gold-glow hover:scale-[1.03] transition-transform"
          >
            <Icon name="Link2" size={16} className="text-gold" />
            <span className="text-sm font-medium hidden sm:inline">Пригласить</span>
          </button>
          <Avatar>{initials}</Avatar>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <nav className="w-[68px] sm:w-20 border-r border-border/60 py-6 flex flex-col items-center gap-2 bg-card/30">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={`relative w-full flex flex-col items-center gap-1.5 py-3 transition-colors ${
                section === n.id ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section === n.id && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded-r-full bg-gold" />}
              <Icon name={n.icon} size={22} />
              <span className="text-[10px] font-medium">{n.label}</span>
            </button>
          ))}
        </nav>

        <aside className="w-full max-w-[340px] sm:w-[340px] border-r border-border/60 flex flex-col bg-card/20 min-h-0">
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2.5">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <input placeholder="Поиск в Prime" className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col">
            {section === 'chats' && <EmptyState icon="MessageCircle" title="Нет чатов" text="Пригласите друзей по ссылке, чтобы начать первую переписку." />}
            {section === 'media' && <EmptyState icon="Image" title="Нет медиа" text="Здесь появятся фото и видео из ваших переписок." />}
            {section === 'groups' && <EmptyState icon="Users" title="Нет групп" text="Создайте группу и добавьте участников по приглашению." />}
            {section === 'status' && (
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 text-left">
                  <Avatar>{initials}</Avatar>
                  <div>
                    <p className="font-medium">Ваш статус</p>
                    <p className="text-sm text-muted-foreground">Нажмите, чтобы добавить</p>
                  </div>
                  <Icon name="Plus" size={18} className="ml-auto text-gold" />
                </button>
              </div>
            )}
            {section === 'calls' && <EmptyState icon="Phone" title="Нет звонков" text="История аудио и видеозвонков появится здесь." />}
          </div>
        </aside>

        <main className="flex-1 hidden md:flex flex-col min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-background pointer-events-none" />
          <div className="flex-1 grid place-items-center z-10">
            <div className="text-center max-w-sm px-6 animate-fade-in">
              <div className="h-20 w-20 rounded-2xl grid place-items-center mx-auto mb-6 gold-border gold-glow">
                <Icon name="Gem" size={36} className="text-gold" />
              </div>
              <h2 className="font-display text-3xl gold-text mb-2">Добро пожаловать, @{user.nick}</h2>
              <p className="text-muted-foreground mb-6">В Prime пока тихо. Пригласите близких по личной ссылке — и начните общение в роскоши.</p>
              <button onClick={() => setInvite(true)} className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-br from-gold to-amber-700 text-background gold-glow hover:scale-[1.03] transition-transform inline-flex items-center gap-2">
                <Icon name="Link2" size={18} />
                Пригласить друзей
              </button>
            </div>
          </div>
        </main>
      </div>

      {invite && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setInvite(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-card gold-border gold-glow p-8 animate-scale-in relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
            <button onClick={() => setInvite(false)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>

            <div className="relative">
              <div className="h-16 w-16 rounded-2xl grid place-items-center mb-5 bg-gradient-to-br from-gold to-amber-700 gold-glow">
                <Icon name="Sparkles" size={28} className="text-background" />
              </div>
              <h3 className="font-display text-3xl gold-text mb-1.5">Ваша пригласительная ссылка</h3>
              <p className="text-sm text-muted-foreground mb-6">Поделитесь личной ссылкой @{user.nick}. Доступ только по приглашению — так клуб остаётся избранным.</p>

              <div className="flex items-center gap-2 rounded-xl bg-secondary/60 border border-border/60 px-4 py-3.5 mb-4">
                <Icon name="Link2" size={18} className="text-gold shrink-0" />
                <span className="text-sm truncate flex-1 font-mono">{inviteLink}</span>
              </div>

              <button onClick={copy} className="w-full rounded-xl py-3.5 font-semibold bg-gradient-to-br from-gold to-amber-700 text-background gold-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                <Icon name={copied ? 'Check' : 'Copy'} size={18} />
                {copied ? 'Скопировано!' : 'Скопировать ссылку'}
              </button>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[{ i: 'Send', l: 'Telegram' }, { i: 'MessageCircle', l: 'WhatsApp' }, { i: 'Mail', l: 'Email' }].map((s) => (
                  <button key={s.l} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors">
                    <Icon name={s.i} size={20} className="text-gold" />
                    <span className="text-[11px] text-muted-foreground">{s.l}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
