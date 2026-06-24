import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'chats' | 'media' | 'groups' | 'status' | 'calls';

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
  { id: 'media', label: 'Медиа', icon: 'Image' },
  { id: 'groups', label: 'Группы', icon: 'Users' },
  { id: 'status', label: 'Статусы', icon: 'CircleDot' },
  { id: 'calls', label: 'Звонки', icon: 'Phone' },
];

const CHATS = [
  { name: 'Алиса Воронцова', last: 'Отправила приглашение в Prime ✨', time: '14:32', unread: 2, online: true, av: 'AV' },
  { name: 'Деловой клуб', last: 'Максим: встреча в 18:00', time: '13:05', unread: 0, online: false, av: 'ДК' },
  { name: 'Лев Орлов', last: 'Видеозвонок завершён · 24 мин', time: '11:48', unread: 0, online: true, av: 'ЛО' },
  { name: 'Семья', last: 'Мама: 📷 Фото', time: 'Вчера', unread: 5, online: false, av: 'С' },
  { name: 'Игнат Белов', last: 'Спасибо за приглашение!', time: 'Вчера', unread: 0, online: false, av: 'ИБ' },
];

const MESSAGES = [
  { me: false, text: 'Привет! Перешла в Prime — здесь дизайн просто роскошный 🥂', time: '14:28' },
  { me: true, text: 'Согласен, золото на тёмном выглядит благородно. Скинуть приглашение для остальных?', time: '14:30' },
  { me: false, text: 'Да! Отправь ссылку, добавлю весь наш клуб', time: '14:31' },
  { me: false, text: 'Отправила приглашение в Prime ✨', time: '14:32' },
];

const STATUSES = [
  { name: 'Ваш статус', sub: 'Нажмите, чтобы добавить', me: true, av: 'Я' },
  { name: 'Алиса Воронцова', sub: '12 минут назад', me: false, av: 'AV' },
  { name: 'Лев Орлов', sub: '40 минут назад', me: false, av: 'ЛО' },
  { name: 'Игнат Белов', sub: '2 часа назад', me: false, av: 'ИБ' },
];

const CALLS = [
  { name: 'Лев Орлов', type: 'Видео', dir: 'in', time: 'Сегодня, 11:24', missed: false, av: 'ЛО' },
  { name: 'Алиса Воронцова', type: 'Аудио', dir: 'out', time: 'Вчера, 20:10', missed: false, av: 'AV' },
  { name: 'Деловой клуб', type: 'Видео', dir: 'in', time: 'Вчера, 18:02', missed: true, av: 'ДК' },
  { name: 'Игнат Белов', type: 'Аудио', dir: 'in', time: '2 дня назад', missed: false, av: 'ИБ' },
];

const GROUPS = [
  { name: 'Деловой клуб', members: 48, sub: '6 онлайн', av: 'ДК' },
  { name: 'Семья', members: 7, sub: '2 онлайн', av: 'С' },
  { name: 'Закрытый круг Prime', members: 12, sub: 'по приглашению', av: 'PR' },
];

const MEDIA = ['from-amber-900/40 to-yellow-700/20', 'from-stone-800/60 to-amber-800/20', 'from-yellow-900/30 to-orange-800/20', 'from-amber-800/40 to-stone-700/30', 'from-orange-900/30 to-amber-700/20', 'from-stone-900/60 to-yellow-800/20', 'from-amber-900/50 to-stone-800/30', 'from-yellow-800/30 to-amber-900/30', 'from-stone-800/50 to-orange-900/20'];

function Avatar({ children, online, size = 'md' }: { children: React.ReactNode; online?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'lg' ? 'h-14 w-14 text-lg' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-sm';
  return (
    <div className="relative shrink-0">
      <div className={`${s} rounded-full grid place-items-center font-semibold text-background bg-gradient-to-br from-gold to-amber-700 ring-1 ring-gold/30`}>
        {children}
      </div>
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-card" />}
    </div>
  );
}

export default function Index() {
  const [section, setSection] = useState<Section>('chats');
  const [active, setActive] = useState(0);
  const [invite, setInvite] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = 'https://prime.chat/i/AURUM-92xK7';

  const copy = () => {
    navigator.clipboard?.writeText(inviteLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen grain bg-background text-foreground flex flex-col">
      {/* Top bar */}
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
        <button
          onClick={() => setInvite(true)}
          className="group flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 gold-border gold-glow hover:scale-[1.03] transition-transform"
        >
          <Icon name="Link2" size={16} className="text-gold" />
          <span className="text-sm font-medium hidden sm:inline">Пригласить</span>
        </button>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar nav */}
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

        {/* List column */}
        <aside className="w-full max-w-[340px] sm:w-[340px] border-r border-border/60 flex flex-col bg-card/20 min-h-0">
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2.5">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <input placeholder="Поиск в Prime" className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {section === 'chats' && CHATS.map((c, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors animate-fade-in ${active === i ? 'bg-gold/10' : 'hover:bg-secondary/40'}`} style={{ animationDelay: `${i * 50}ms` }}>
                <Avatar online={c.online}>{c.av}</Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-medium truncate">{c.name}</span>
                    <span className="text-[11px] text-muted-foreground shrink-0">{c.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm text-muted-foreground truncate">{c.last}</span>
                    {c.unread > 0 && <span className="shrink-0 h-5 min-w-5 px-1.5 rounded-full bg-gold text-background text-[11px] font-bold grid place-items-center">{c.unread}</span>}
                  </div>
                </div>
              </button>
            ))}

            {section === 'status' && (
              <div className="py-2">
                {STATUSES.map((s, i) => (
                  <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 text-left animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className={`rounded-full p-[2px] ${s.me ? '' : 'bg-gradient-to-br from-gold to-amber-700'}`}>
                      <Avatar>{s.av}</Avatar>
                    </div>
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.sub}</p>
                    </div>
                    {s.me && <Icon name="Plus" size={18} className="ml-auto text-gold" />}
                  </button>
                ))}
              </div>
            )}

            {section === 'groups' && (
              <div className="py-2">
                {GROUPS.map((g, i) => (
                  <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 text-left animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <Avatar>{g.av}</Avatar>
                    <div>
                      <p className="font-medium">{g.name}</p>
                      <p className="text-sm text-muted-foreground">{g.members} участников · {g.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {section === 'calls' && (
              <div className="py-2">
                {CALLS.map((c, i) => (
                  <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/40 text-left animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <Avatar>{c.av}</Avatar>
                    <div className="flex-1">
                      <p className={`font-medium ${c.missed ? 'text-destructive' : ''}`}>{c.name}</p>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Icon name={c.dir === 'in' ? 'ArrowDownLeft' : 'ArrowUpRight'} size={14} className={c.missed ? 'text-destructive' : 'text-emerald-400'} />
                        {c.type} · {c.time}
                      </div>
                    </div>
                    <Icon name={c.type === 'Видео' ? 'Video' : 'Phone'} size={18} className="text-gold" />
                  </button>
                ))}
              </div>
            )}

            {section === 'media' && (
              <div className="p-3 grid grid-cols-3 gap-2">
                {MEDIA.map((m, i) => (
                  <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${m} ring-1 ring-border/50 grid place-items-center animate-scale-in`} style={{ animationDelay: `${i * 40}ms` }}>
                    <Icon name={i % 3 === 0 ? 'Play' : 'Image'} size={20} className="text-gold/60" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Conversation / detail */}
        <main className="flex-1 hidden md:flex flex-col min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-background pointer-events-none" />
          {section === 'chats' ? (
            <>
              <div className="glass border-b border-border/60 px-6 py-3.5 flex items-center gap-3 z-10">
                <Avatar online={CHATS[active].online}>{CHATS[active].av}</Avatar>
                <div className="flex-1">
                  <p className="font-medium">{CHATS[active].name}</p>
                  <p className="text-xs text-emerald-400">{CHATS[active].online ? 'в сети' : 'был(а) недавно'}</p>
                </div>
                <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary/60 transition-colors"><Icon name="Phone" size={18} className="text-gold" /></button>
                <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary/60 transition-colors"><Icon name="Video" size={18} className="text-gold" /></button>
                <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary/60 transition-colors"><Icon name="MoreVertical" size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-3 z-10">
                {MESSAGES.map((m, i) => (
                  <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'} animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${m.me ? 'bg-gradient-to-br from-gold to-amber-700 text-background rounded-br-md' : 'bg-card border border-border/60 rounded-bl-md'}`}>
                      <p className="text-sm leading-relaxed">{m.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${m.me ? 'text-background/70' : 'text-muted-foreground'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass border-t border-border/60 p-4 flex items-center gap-3 z-10">
                <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary/60 transition-colors"><Icon name="Paperclip" size={20} className="text-muted-foreground" /></button>
                <div className="flex-1 flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-3">
                  <input placeholder="Сообщение..." className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground" />
                  <Icon name="Smile" size={20} className="text-muted-foreground" />
                </div>
                <button className="h-11 w-11 grid place-items-center rounded-full bg-gradient-to-br from-gold to-amber-700 text-background gold-glow hover:scale-105 transition-transform">
                  <Icon name="Send" size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 grid place-items-center z-10">
              <div className="text-center max-w-sm px-6 animate-fade-in">
                <div className="h-20 w-20 rounded-2xl grid place-items-center mx-auto mb-6 gold-border gold-glow">
                  <Icon name={NAV.find((n) => n.id === section)!.icon} size={36} className="text-gold" />
                </div>
                <h2 className="font-display text-3xl gold-text mb-2">{NAV.find((n) => n.id === section)!.label}</h2>
                <p className="text-muted-foreground">Выберите элемент слева, чтобы продолжить в роскошной тишине Prime.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Invite modal */}
      {invite && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setInvite(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-card gold-border gold-glow p-8 animate-scale-in relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
            <button onClick={() => setInvite(false)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>

            <div className="relative">
              <div className="h-16 w-16 rounded-2xl grid place-items-center mb-5 bg-gradient-to-br from-gold to-amber-700 gold-glow">
                <Icon name="Sparkles" size={28} className="text-background" />
              </div>
              <h3 className="font-display text-3xl gold-text mb-1.5">Пригласить в Prime</h3>
              <p className="text-sm text-muted-foreground mb-6">Поделитесь личной ссылкой. Доступ только по приглашению — так клуб остаётся избранным.</p>

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
