import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().min(10).required()
});

const Form = ({ setShowModal, setModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    const config = {
      method: 'post',
      url: 'http://localhost:3000/api/contact',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    try {
      const response = await axios(config);
      if (response.status === 200) {
        setModal('Success');
        setShowModal(true);
        reset();
      }
    } catch (err) {
      setModal('Error');
      setShowModal(true);
      console.error('error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="nes-field" id="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          {...register('name')}
          type="text"
          name="name"
          className="nes-input"
        />
        <span className="nes-text is-error">{errors.name?.message}</span>
      </div>
      <div className="nes-field" id="form-group">
        <label htmlFor="email">Your Email</label>
        <input
          {...register('email')}
          type="text"
          name="email"
          className="nes-input"
        />
        <span className="nes-text is-error">{errors.email?.message}</span>
      </div>
      <div className="nes-field" id="form-group">
        <label htmlFor="message">Your Message</label>
        <textarea
          {...register('message')}
          type="text"
          name="message"
          className="nes-textarea"
        />
        <span className="nes-text is-error">{errors.message?.message}</span>
      </div>
      <div id="button-container">
        <button className="nes-btn is-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
