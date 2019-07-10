import React from 'react';
export default class SearchResult extends React.Component {

    state = {
        loading: true,
        result: null,
    }

    async componentDidMount() {
        let head = new Headers();
        head.append('Content-Type', 'application/json');
        const res = await fetch('http://localhost:5000/search', {
            method: 'post',
            headers: head,
            body: JSON.stringify({'id': 12, 'name': 'jordan'}),
        });
        const data = await res.json();
        console.log(data);
        this.setState({result: data.body});
        this.setState({loading: false});
    }

    render() {
        return <div>
                    {this.state.loading ? <p>loading...</p> : <p>ID: {this.state.result.id}</p>}
            </div>;
    }
}
