import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const FEATURES = [
  { icon: 'ShieldCheck', title: 'Сквозное шифрование', desc: 'Только вы и собеседник читаете сообщения' },
  { icon: 'Video', title: 'Видеозвонки', desc: 'HD-качество без ограничений по времени' },
  { icon: 'Users', title: 'Группы и каналы', desc: 'Закрытые сообщества только по приглашению' },
  { icon: 'Image', title: 'Медиа без сжатия', desc: 'Фото и видео в оригинальном качестве' },
];

export default function Invite() {
  const { nick } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grain bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 h-72 w-72 rounded-full bg-amber-700/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 h-72 w-72 rounded-full bg-gold/6 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="glass border-b border-border/40 px-6 py-4 flex items-center gap-3 relative z-10">
        <div className="h-9 w-9 rounded-xl grid place-items-center gold-border gold-glow">
          <Icon name="Gem" size={18} className="text-gold" />
        </div>
        <span className="font-display text-xl gold-text tracking-wide">Prime</span>
        <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase ml-1 mt-0.5">Private Messenger</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-lg text-center animate-fade-in">

          {/* Gem icon */}
          <div className="relative inline-flex mb-8">
            <div className="h-24 w-24 rounded-3xl grid place-items-center gold-border gold-glow mx-auto">
              <Icon name="Gem" size={44} className="text-gold" />
            </div>
            <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-br from-gold to-amber-700 grid place-items-center gold-glow">
              <Icon name="Sparkles" size={14} className="text-background" />
            </span>
          </div>

          {/* Invite text */}
          {nick ? (
            <>
              <p className="text-sm text-gold/80 tracking-widest uppercase mb-3">Личное приглашение от</p>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-gold/10 border border-gold/25 mb-6">
                <Icon name="AtSign" size={14} className="text-gold" />
                <span className="font-mono text-sm text-gold font-medium">{nick}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gold/80 tracking-widest uppercase mb-6">Добро пожаловать</p>
          )}

          <h1 className="font-display text-5xl sm:text-6xl gold-text leading-tight mb-4">
            Войдите в Prime
          </h1>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Элегантный мессенджер для тех, кто ценит приватность и стиль. Доступ только по личному приглашению.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold text-lg bg-gradient-to-br from-gold to-amber-700 text-background gold-glow hover:scale-[1.03] transition-transform mb-4"
          >
            <Icon name="Gem" size={22} />
            Присоединиться к Prime
          </button>

          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-2">
            <Icon name="ShieldCheck" size={13} className="text-gold/60" />
            Бесплатно · Сквозное шифрование · Без рекламы
          </p>
        </div>

        {/* Features grid */}
        <div className="w-full max-w-lg mt-16 grid grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl bg-card/60 gold-border p-5 text-left animate-fade-in"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <div className="h-10 w-10 rounded-xl grid place-items-center mb-3 bg-gold/10">
                <Icon name={f.icon} size={20} className="text-gold" />
              </div>
              <p className="font-semibold text-sm mb-1">{f.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground/50 relative z-10">
        Prime · Приватный мессенджер · Доступ по приглашению
      </footer>
    </div>
  );
}
