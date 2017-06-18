import React from 'react';


class ContactDetail extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        }

        this.renderForm = this.renderForm.bind(this);
        this.renderEditingItem = this.renderEditingItem.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.updateEditedContact = this.updateEditedContact.bind(this);
    }
    toggleState(){
        const {isEditing} = this.state;
        this.setState({
            isEditing:!isEditing
        })
    }
    updateEditedContact(e){
        e.preventDefault();
        const name = this.refs.name.value;
        const email = this.refs.email.value;
        const phone = this.refs.phone.value;
        this.props.updateEditContact(this.props.index, name, email, phone);
        this.toggleState();
    }
    cancelEdit(){
        this.setState({
            isEditing: false
        });
    }
    renderForm(){
        return(
            <form onSubmit={this.updateEditedContact}>
                <input type="text" name="name" ref="name" defaultValue={this.props.detail.name}/>
                <input type="email" name="email" ref="email" defaultValue={this.props.detail.email}/>
                <input type="phone" name="phone" ref="phone" defaultValue={this.props.detail.phone}/>
                <button type="submit" className="save">Save</button>
                <button type="button" className="cancel" onClick={this.cancelEdit.bind(this)}>Cancel</button>
            </form>
        )
    }
    renderEditingItem(){
        return(
            <table>
                <tbody>
                <tr>
                    <td>{this.props.detail.name}</td>
                    <td className="email">{this.props.detail.email}</td>
                    <td>{this.props.detail.phone}</td>
                    <td><span><i className="fa fa-pencil" aria-hidden="true" onClick={()=>{this.toggleState()}}></i>
                         <i className="fa fa-trash" aria-hidden="true" onClick={()=>{
                             this.props.deleteContact(this.props.index)
                         }}></i></span></td>
                </tr>
                </tbody>
            </table>
        )
    }


    render(){
        const {isEditing} = this.state;
        return(
            <section>
                {
                    isEditing ? this.renderForm() : this.renderEditingItem()
                }


            </section>
        )
    }

}


export default ContactDetail;