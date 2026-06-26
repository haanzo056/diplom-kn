import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#3D5AF1', '#8b5cf6', '#3D5AF1'],
  animationSpeed = 6,
}: GradientTextProps) {
  return (
    <>
      <span
        className={`gradient-text-shine inline-block bg-clip-text text-transparent ${className}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
          backgroundSize: '300% 100%',
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {children}
      </span>
      <style>{`
        .gradient-text-shine {
          -webkit-background-clip: text;
          animation-name: gradient-text-shine-move;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes gradient-text-shine-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
