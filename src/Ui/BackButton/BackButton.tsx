import { Link } from 'react-router-dom';
import './BackButton.css';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to = '/', label = 'Back' }: BackButtonProps) {
  return (
    <Link to={to} className="back-button">
      ← {label}
    </Link>
  );
}
