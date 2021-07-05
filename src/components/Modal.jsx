import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { format } from 'date-fns';

import './Modal.scss';

function Modal({ photoId, hideModal }) {
  const [data, setData] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', comment: '' });
  const [formErrors, setformErrors] = useState({});

  useEffect(() => {
    axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${photoId}`)
      .then(response => setData(response.data));
  }, [setData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setformErrors({});
    axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${photoId}/comments`, {
        'name': formValues.name,
        'comment': formValues.comment
      })
      .then(response => {
        if (response.status === 204) {
          alert('Комментарий отправлен, но сохранен не будет!');
          setData({
            ...data,
            'comments': [...data.comments, {
              'id': Math.floor(300 + Math.random() * 701),
              'text': formValues.comment,
              'date': Date.now()
            }]
          });
          setFormValues({ name: '', comment: '' });
        } else {
          alert('Ошибка!');
        }
      })
      .catch(error => {
        const errors = error.response.data.errors;
        if (errors) {
          setformErrors(errors);
          console.log(errors);
        }
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="modal" onClick={hideModal}>
      <div className="modal__window" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close-btn" onClick={hideModal}></div>
        {
          data && <React.Fragment>
            <div className="modal__grid">
              <img src={data.url} alt="img" className="modal__img" />
              <div className="modal__comments">
                {data && (
                  data.comments.length > 0
                    ? data.comments.map(comment => 
                        <div key={comment.id} className="comment">
                          <div className="comment__date">{format(new Date(comment.date), 'dd.MM.yyyy')}</div>
                          <div className="comment__text">{comment.text}</div>
                        </div>
                      )
                    : <div className="modal__nocomments">Комментарии отсутствуют</div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="comment-form">
                {formErrors.name && <div className="comment-form__error">{formErrors.name}</div>}
                <input
                  type="text"
                  name="name"
                  className={classnames('comment-form__input', { 'comment-form__input_error': formErrors.name })}
                  placeholder="Ваше имя"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                {formErrors.comment && <div className="comment-form__error">{formErrors.comment}</div>}
                <input
                  type="text"
                  name="comment"
                  className={classnames('comment-form__input', { 'comment-form__input_error': formErrors.comment })}
                  placeholder="Ваш комментарий"
                  value={formValues.comment}
                  onChange={handleInputChange}
                />
                <button type="submit" className="comment-form__btn">Оставить комментарий</button>
              </form>
            </div>
          </React.Fragment>
        }
      </div>
    </div>
  );
}

export default Modal;