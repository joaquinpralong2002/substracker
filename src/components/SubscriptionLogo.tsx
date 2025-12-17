interface SubscriptionLogoProps {
  size?: number;
  className?: string;
}

export function SubscriptionLogo({
  size = 120,
  className = "",
}: SubscriptionLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Círculo de fondo con gradiente */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#114B5F", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#1A936F", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "#F3E9D2", stopOpacity: 0.95 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#C6DABF", stopOpacity: 0.95 }}
          />
        </linearGradient>
      </defs>

      {/* Círculo de fondo */}
      <circle cx="60" cy="60" r="58" fill="url(#bgGradient)" />

      {/* Tarjeta/documento principal */}
      <rect
        x="25"
        y="35"
        width="70"
        height="50"
        rx="6"
        fill="url(#cardGradient)"
        stroke="#C6DABF"
        strokeWidth="1"
      />

      {/* Banda magnética de la tarjeta */}
      <rect x="25" y="45" width="70" height="8" fill="#114B5F" opacity="0.3" />

      {/* Líneas de texto/suscripciones */}
      <line
        x1="32"
        y1="62"
        x2="60"
        y2="62"
        stroke="#114B5F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="70"
        x2="75"
        y2="70"
        stroke="#1A936F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="78"
        x2="55"
        y2="78"
        stroke="#88D498"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Ícono de verificación/check circular */}
      <circle cx="85" cy="72" r="10" fill="#1A936F" />
      <path
        d="M81 72 L83.5 74.5 L89 69"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Detalles decorativos - puntos que simulan múltiples servicios */}
      <circle cx="18" cy="45" r="3" fill="#88D498" opacity="0.8" />
      <circle cx="102" cy="38" r="3" fill="#C6DABF" opacity="0.8" />
      <circle cx="15" cy="75" r="2.5" fill="#1A936F" opacity="0.7" />
    </svg>
  );
}
