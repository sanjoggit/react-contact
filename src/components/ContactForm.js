import React from 'react';


class ContactForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            phone:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.target.classList.add('active');
        this.setState({
            [e.target.name]: e.target.value
        });
        this.showInputError(e.target.name);
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.showFormErrors()){
            return false
        } else {
            this.props.addContact(e)
        }
    }
    showFormErrors(){
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input=>{
            input.classList.add('active');
            const isInputValid = this.showInputError(input.name);
            if(!isInputValid){
                isFormValid = false;
            }
        });
        return isFormValid;
    }
    showInputError(refName){
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        if(!validity.valid){
            if(validity.valueMissing){
                error.textContent = `${label} required`;

            } else if(validity.typeMismatch){
                error.textContent = `${label} required`;
            }
            return false;
        }
        error.textContent = '';
        return true;

    }

    render() {
        return (
            <form  onSubmit={this.handleSubmit} noValidate>
                <input type="text" name="name" ref="name" id="nameLabel" required placeholder="Full name" value={this.props.currentContact.name}
                       onChange={e => this.props.updateContact(e)}/><div className="error" id="nameError" />
                <input type="email" name="email" placeholder="E-mail address" ref="email" id="emailLabel" required value={this.props.currentContact.email}
                       onChange={e => this.props.updateContact(e)}/><div className="error" id="emailError"/>
                <input type="number" name="phone" placeholder="Phone number" ref="phone" id="phoneLabel" required value={this.props.currentContact.phone}
                       onChange={e => this.props.updateContact(e)}/><div className="error" id="phoneError"/>
                <button type="submit">Add New</button>
            </form>
        )
    }
}

export default ContactForm;



/*import React from 'react';


 class ContactForm extends React.Component{
 render() {
 return (
 <form onSubmit={e => this.props.addContact(e)}>
 <input type="text" name="name" placeholder="Full name" value={this.props.currentContact.name}
 onChange={e => this.props.updateContact(e)}/>
 <input type="email" name="email" placeholder="E-mail address" value={this.props.currentContact.email}
 onChange={e => this.props.updateContact(e)}/>
 <input type="number" name="phone" placeholder="Phone number" value={this.props.currentContact.phone}
 onChange={e => this.props.updateContact(e)}/>
 <button type="submit">Add New</button>
 </form>
 )
 }
 }

 export default ContactForm;*/



