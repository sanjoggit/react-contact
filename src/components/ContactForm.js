import React from 'react';


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

export default ContactForm;


/*const ContactForm = ({currentContact, updateContact, addContact})=>{
    return(
        <form onSubmit={e => addContact(e)}>
            <input type="text" name="name" placeholder="Full name" value={currentContact.name} onChange={e => updateContact(e)}/>
            <input type="email" name="email" placeholder="E-mail address" value={currentContact.email} onChange={e => updateContact(e)}/>
            <input type="number" name="phone" placeholder="Phone number" value={currentContact.phone} onChange={e => updateContact(e)}/>
            <button type="submit">Add New</button>
        </form>
    )
}*/


