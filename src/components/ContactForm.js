import React from 'react';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone:'',
            message: ''
        };
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
            this.props.addContact(e);
            this.setState({message: 'contact added'});
            setTimeout(()=>{ this.setState({message: ''}) }, 3000);
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
        //console.log(validity);
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        if(!validity.valid){
            if(validity.valueMissing){
                error.textContent = `${label} required`;
            } else if(validity.patternMismatch){
                error.textContent = `${label} 10 digit number required`;
            } else if(validity.typeMismatch){
                error.textContent = `${label} Invalid email address`;
            }

            return false;
        }

        error.textContent = '';
        return true;
    }


    render() {
        return (
            <section>
            <span className="successMessage">{ this.state.message }</span>
                <div className="error" id="nameError" /><div className="error" id="emailError"/><div className="error" id="phoneError"/>
            <form  onSubmit={this.handleSubmit} noValidate>
                <input type="text"
                       name="name"
                       pattern="[A-Za-z\s]+"
                       ref="name"
                       id="nameLabel"
                       required
                       placeholder="Full name"
                       value={this.props.currentContact.name}
                       onChange={e => this.props.updateContact(e)}/>
                <input type="email"
                       name="email"
                       //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                       placeholder="E-mail address"
                       ref="email"
                       id="emailLabel"
                       required
                       value={this.props.currentContact.email}
                       onChange={e => this.props.updateContact(e)}/>
                <input type="tel"
                       name="phone"
                       placeholder="Phone number"
                       pattern="^[0-9]{2}[0-9]{8}$"
                       ref="phone"
                       id="phoneLabel"
                       required
                       value={this.props.currentContact.phone}
                       onChange={e => this.props.updateContact(e)}/>
                <button className="add" type="submit">Add New</button>
            </form>
            </section>
        )
    }
}

export default ContactForm;






