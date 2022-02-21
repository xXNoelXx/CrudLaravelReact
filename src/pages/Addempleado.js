import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

class Addempleado extends Component{
    state = {
        nombre:'',
        apellidopaterno:'',
        apellidomaterno:'',
        correo:'',
        error_list: [],
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    } 

    saveEmpleado = async (e) =>{
        e.preventDefault();

        const res = await axios.post('http://localhost:8000/api/add-empleado', this.state);
        if(res.data.status === 200){
            //console.log(res.data.message);
            swal({
                title: "Exitoso",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
            this.props.history.push('/');
            this.setState({
                nombre:'',
                apellidopaterno:'',
                apellidomaterno:'',
                correo:'',
            });
        }
        else{
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Añadir Empleado
                                        <Link to='/' className="btn btn-primary btn-sm float-end">Regresar</Link>
                                    </h4>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveEmpleado}>

                                        <div className="form-group mb-3">
                                            <label>Nombre</label>
                                            <input type="text" name="nombre" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                            <span className="text-danger">{this.state.error_list.nombre}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Apellido Paterno</label>
                                            <input type="text" name="apellidopaterno" onChange={this.handleInput} value={this.state.apellidopaterno} className="form-control"/>
                                            <span className="text-danger">{this.state.error_list.apellidopaterno}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Apellido Materno</label>
                                            <input type="text" name="apellidomaterno" onChange={this.handleInput} value={this.state.apellidomaterno} className="form-control"/>
                                            <span className="text-danger">{this.state.error_list.apellidomaterno}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Correo</label>
                                            <input type="text" name="correo" onChange={this.handleInput} value={this.state.correo} className="form-control"/>
                                            <span className="text-danger">{this.state.error_list.correo}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary">Guardar Empleado</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>

                </div>

            </div>
        );
    }

}

export default Addempleado;