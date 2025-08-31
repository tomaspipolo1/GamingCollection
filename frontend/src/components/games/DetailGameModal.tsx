import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Game } from '../../types';
import '../../styles/components/DetailGameModal.css';

interface DetailGameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailGameModal: React.FC<DetailGameModalProps> = ({ game, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen || !game) return null;

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'steam':
        return '/icons/steam.ico';
      case 'epic games':
        return '/icons/epic.ico';
      case 'origin':
        return '/icons/origin.ico';
      case 'battle.net':
        return '/icons/battlenet.ico';
      case 'gog':
        return '/icons/gog.ico';
      case 'uplay':
        return '/icons/uplay.ico';
      case 'xbox game pass':
        return '/icons/xbox.ico';
      case 'ubisoft connect':
        return '/icons/ubisoft.ico';
      case 'ea play':
        return '/icons/ea.ico';
      case 'playstation':
        return '/icons/playstation.ico';
      case 'nintendo':
        return '/icons/nintendo.ico';
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'jugado':
        return '#00ff88';
      case 'sin jugar':
        return '#ff6b6b';
      case 'comprar':
        return '#ffa500';
      default:
        return '#6b7280';
    }
  };

  const renderPriceSection = (price: number, currency: string) => {
    if (price === 0) {
      return <span className="price-free">Gratis</span>;
    }
    return (
      <span className="price-value">
        {price} {currency}
      </span>
    );
  };

  const modalContent = (
    <div className="detail-game-modal-overlay" onClick={onClose}>
      <div className="detail-game-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Título centrado en todo el modal */}
          <div className="modal-title-centered">
            <div className="modal-title-wrap">
              <span className="modal-title-icon">🎮</span>
              <h2 className="modal-title-text">Detalles del Juego</h2>
            </div>
          </div>

          <div className="detail-content">
            {/* Columna 1: Imagen */}
            <div className="detail-image-column">
              <div className="game-image-container">
                {game.imageUrl ? (
                  <img 
                    src={game.imageUrl} 
                    alt={game.title}
                    className="game-detail-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`game-image-placeholder ${game.imageUrl ? 'hidden' : ''}`}>
                  🎮
                </div>
              </div>
            </div>

            {/* Columna 2: Datos */}
            <div className="detail-info-column">
              <div className="detail-section">
                <h3 className="detail-title">{game.title}</h3>
              </div>

              <div className="detail-section">
                <div className="detail-row">
                  <div className="detail-field">
                    <label className="detail-label">Plataforma</label>
                                         <div className="detail-value platform-value">
                       {(() => {
                         const iconPath = getPlatformIcon(game.platform);
                         return iconPath ? (
                           <img 
                             src={iconPath} 
                             alt={game.platform}
                             className="platform-icon"
                           />
                         ) : null;
                       })()}
                       <span>{game.platform}</span>
                     </div>
                  </div>
                                     <div className="detail-field">
                     <label className="detail-label">Género</label>
                     <div className="detail-value">{game.genre.name}</div>
                   </div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-row">
                  <div className="detail-field">
                    <label className="detail-label">Estado</label>
                    <div 
                      className="detail-value status-value"
                      style={{ color: getStatusColor(game.status) }}
                    >
                      {game.status}
                    </div>
                  </div>
                  <div className="detail-field">
                    <label className="detail-label">Precio</label>
                    <div className="detail-value price-value">
                      {renderPriceSection(game.price, game.currency)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <label className="detail-label">Descripción</label>
                <div className="detail-description">
                  {game.description || 'Sin descripción disponible'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default DetailGameModal;
