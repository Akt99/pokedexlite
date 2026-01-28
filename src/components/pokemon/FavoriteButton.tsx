import { Star } from 'lucide-react';

type Props = {
  active: boolean;
  onClick: () => void;
};

export default function FavoriteButton({ active, onClick }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // VERY IMPORTANT
        onClick();
      }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: 8,
        right: 8,
      }}
      aria-label="Toggle favorite"
    >
      <Star
        size={20}
        fill={active ? '#facc15' : 'none'}
        color={active ? '#facc15' : '#999'}
      />
    </button>
  );
}
