import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().min(10).max(500).required()
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
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
