import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './style.css';

//Evalua que solo contiene letras y espacios
const stringOnly = (value) =>  /^[A-Z a-z]+$/i.test(value)
const genderValues = value =>  /^[male female other]+$/i.test(value)

const schema = yup.object({
  id: yup.string().test('Letters and space only', 'The field should have letter only', stringOnly),
  age: yup.number().positive('Please this field must be a number').integer().required().max(112),
  email: yup.string().email('Invalid email format').required('Required'),
  name: yup.string(),
  date: yup.string(),
  textarea: yup.string(),
  gender: yup.string().test(genderValues),
  file: yup.string()

}).required();

export default function Register() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data =>{

      console.log(data);
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    <div className="form-group">
      <label>name: (validado para que solo admita letras y espacios)</label>
      <input className="form-control" {...register("id")} />
      <p>{errors.id?.message}</p>
    </div>
    <div className="form-group">
    age:
      <input className="form-control" {...register("age")} />
      <p>{errors.age?.message}</p>
    </div>
    <div className="form-group">
    email:
      <input className="form-control" {...register("email")}/>
      <p>{errors.email?.message}</p>
    </div>
    <div className="form-group">
    fecha:
      <input className="form-control" type="date" {...register("date")}/>
      <p>{errors.email?.message}</p>
    </div>
    <div className="form-group">
    textarea:
      {/* <input className="form-control" type="textarea" {...register("textarea")}/> */}
      <textarea className="form-control" {...register("textarea")}/>
      <p>{errors.email?.message}</p>
    </div>
    <div className="form-group">
    <select className="form-control" {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
    </select>
    <br/>
    </div>
    <div className="form-group">
    <input type="file" {...register("file")}/>
    </div>
      <input type="submit" className="btn btn-primary" />
    </form>
    </div>
  );
}
