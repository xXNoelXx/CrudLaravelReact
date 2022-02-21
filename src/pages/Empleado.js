import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Empleado extends Component{

        state = {
            empleados:[],
            loading:true,
        }

    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/empleados');
        //console.log(res);

        if(res.data.status === 200){
                this.setState({
                    empleados: res.data.empleados,
                    loading:false,
                });
        }
    }

    deleteEmpleado = (e, id) =>{

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Borrando";
        const res =  axios.delete('http://localhost:8000/api/delete-empleado/{$id}');
        if(res.data.status === 200){

            thidClickedFunda.closest("tr").remove();
            //console.log(res.data.message);
            swal({
                title: "Borrado",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
            });
        }
    }

    render(){

        var empleado_HTMLTABLE ="";
        if(this.state.loading){
            empleado_HTMLTABLE = <tr> <td colSpan="6"> <h2>Cargando</h2> </td> </tr>
        }
        else{
            empleado_HTMLTABLE = this.state.empleados.map((item)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellidopaterno}</td>
                        <td>{item.apellidomaterno}</td>
                        <td>{item.correo}</td>
                        <td>
                            <Link to={'edit-empleado/${item.id}'} className="btn btn-success btn-sm">Editar</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => this.deleteEmpleado(e, item.id)} className="btn btn-danger btn-sm">Borrar</button>
                        </td>
                    </tr>
                )
            }); 
        }

        return (
            <div className="container">
                <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Datos de Empleado
                                        <Link to='add-empleado' className="btn btn-primary btn-sm float-end">Añadir Empleado</Link>
                                    </h4>

                                </div>
                                <div className="card-body">

                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>ApellidoPaterno</th>
                                                    <th>ApellidoMaterno</th>
                                                    <th>Correo</th>
                                                    <th>Editar</th>
                                                    <th>Borrar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {empleado_HTMLTABLE}
                                            </tbody>

                                        </table>

                                </div>

                            </div>

                        </div>

                </div>

            </div>
        );
    }

}

export default Empleado;