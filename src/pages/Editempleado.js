import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class Editempleado extends Component{
    state = {
        nombre:'',
        apellidopaterno:'',
        apellidomaterno:'',
        correo:'',
        error_list:[],
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    } 

    async componentDidMount(){
        const empleado_id = this.props.match.params.id;
        //console.log(empleado_id);
        const res = await axios.get('http://localhost:8000/api/edit-empleado/${empleado_id}');
        if(res.data.status === 200){
            this.setState({
                nombre:res.data.empleado.nombre,
                apellidopaterno:res.data.empleado.apellidopaterno,
                apellidomaterno:res.data.empleado.apellidomaterno,
                correo:res.data.empleado.correo,
            })
        }
        else if(res.data.status === 404){
            swal({
                title: "Peligro",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
            });
            this.props.history.push('/');
        }

    }

    updateEmpleado = async (e) =>{
        e.preventDefault();

        //document.getElementById('updatebtn').disabled = true;
        //document.getElementById('updatebtn').innerText = "Actualizando";
        const empleado_id = this.props.match.params.id;
        const res = await axios.put('http://localhost:8000/api/update-empleado/{$empleado_id}', this.state);
        if(res.data.status === 200){
            //console.log(res.data.message);
            swal({
                title: "Actualizado",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
            this.props.history.push('/');

            //document.getElementById('updatebtn').disabled = false;
            //document.getElementById('updatebtn').innerText = "Actualizar Empleado";
            
        }
        else if(res.data.status === 404){
            swal({
                title: "Peligro",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
            });
            this.props.history.push('/');
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
                                    <h4>Editar Empleado
                                        <Link to='/' className="btn btn-primary btn-sm float-end">Regresar</Link>
                                    </h4>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateEmpleado}>
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
                                            <button type="submit" id="updatebtn" className="btn btn-primary">Actualizar Empleado</button>
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

export default Editempleado;