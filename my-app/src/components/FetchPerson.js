import React from 'react';
export default class FetchPerson extends React.Component {

    state = {
        loading: true,
        person: null,
    }

    async componentDidMount() {
        const person = await fetch('https://api.randomuser.me/')
        const data = await person.json();
        console.log(data)
        this.setState({person: data.results[0]});
        this.setState({loading: false})
    }

    render() {
        return <div>      
                    {this.state.loading ? <p>loading...</p> : <p> {this.state.person.name.first} </p>}
            </div>;
    }
}
