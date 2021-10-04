import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './style.css';
//Evalua que es solo un string 
const stringOnly = (value) =>  /^[A-Z a-z]+$/i.test(value)

const schema = yup.object({
  id: yup.string().test('Letters and space only', 'The field should have letter only', stringOnly),
  age: yup.number().positive('Please this field must be a number').integer().required().max(112),
  email: yup.string().email('Invalid email format').required('Required'),
  name: yup.string(),
}).required();

export default function Register() {

  const [datos, setDatos] = useState([])

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data =>{
      
      setDatos({
        datos: [datos, data]
      });
      console.log(datos);
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <input type="submit" className="btn btn-primary" />
    </form>
    </div>
  );
}
