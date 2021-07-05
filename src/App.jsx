import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.scss';

import Modal from './components/Modal';

function App() {
  const [photos, setPhotos] = useState(null);
  const [isModal, setModal] = useState(false);
  const [photoId, setPhotoId] = useState(null);

  useEffect(() => {
    axios.get('https://boiling-refuge-66454.herokuapp.com/images')
      .then(response => setPhotos(response.data));
  }, [setPhotos]);

  useEffect(() => {
    document.body.style.overflow = isModal ? 'hidden' : 'auto';
  }, [isModal]);

  const onImgClick = (id) => {
    setPhotoId(id);
    setModal(true);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Test app</h1>
      </header>

      <section className="content">
        <div className="grid">
          {photos && photos.map(photo => 
            <img
              key={photo.id}
              src={photo.url}
              alt="img"
              className="grid__item"
              onClick={() => onImgClick(photo.id)}
            />
          )}
          {isModal && (
            <Modal
              photoId={photoId}
              hideModal={() => setModal(false)}
            />
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__line"></div>
        <div className="footer__copyright">Copyright © 2021</div>
      </footer>
    </div>
  );
}

export default App;
