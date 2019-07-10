import React from 'react'; 
import Button from '../components/ui/Button';
import styled from 'styled-components';
/**
 * Get the signature associated with an eip712 JSON object
 */

const InputField = styled.input`
padding: 2em;
border-radius: 9px;
background-color: white;
margin-top: 1em;
margin-bottom: 1em;
`;

const TextAreaField = styled.textarea`
padding: 2em;
border-radius: 9px;
background-color: white;
margin-top: 1em;
margin-bottom: 1em;
`;

const FormWrap = styled.div`
display: flex;
flex-direction: column;
width: 400px;
max-width: 100%;
padding: 1em;
`;

const Label = styled.label`
color: white;
font-size: 18px;
`;

const ResultWrap = styled.div`
padding: 2em;
display: flex;
margin: 2em;
border-radius: 9px;
background: white;
width: 400px;
max-width: 90%;
color: black;
`;

const EIP_FAILURE = 'OBJECT_NOT_FOUND'
const EIP_SUCCESS = 'OBJECT_FOUND'
const EIP_FAILURE_MESSAGE = "Could not locate this EIP712 object"
const EIP_SUCCESS_MESSAGE = "Successfully found this EIP712 object"

const SIG_FAILURE = 'SIGNATURE_NOT_FOUND'
const SIG_SUCCESS = 'SIGNATURE_FOUND'
const NO_SIG_PRESENT_MESSAGE = 'No Signature Found'
const SIG_FAILURE_MESSAGE = 'Could not find signature associated with this address'
const SIG_SUCCESS_MESSAGE = 'Successfully found signature from this address'

const PROOF_FAILURE = 'MERKLE_PROOF_NOT_FOUND'
const PROOF_SUCCESS = 'MERKLE_PROOF_FOUND'
const PROOF_FAILURE_MESSAGE = 'Could not recreate Merkle proof'
const PROOF_SUCCESS_MESSAGE = 'Successfully recreated Merkle proof'

const SEARCH_FAILURE = 'SEARCH_FAILED'
// const SEARCH_ERROR = 'SEARCH_FAILED_ERROR'
const SEARCH_SUCCESS = 'SEARCH_SUCCEEDED'

const SEARCH_SUCCESS_MESSAGE = 'Data verified to be on blockchain'
const SEARCH_FAILURE_MESSAGE = 'Data not verified on blockchain'
const SEARCH_ERROR_MESSAGE = 'Data not verified on blockchain (could be a formatting error)'

const NOT_ATTEMPTED_WARNING = 'NOT_ATTEMPTED'
const NOT_ATTEMPTED_MESSAGE = ''

const result_match = (res, success_code, fail_code, success_message, fail_message, other_fail_message = "") => {
  if (res === success_code) {
    return success_message
  }
  if (res === NOT_ATTEMPTED_WARNING) {
    return NOT_ATTEMPTED_MESSAGE
  }
  if (res === fail_code) {
    return fail_message
  }
  return other_fail_message
}

const Result = ({ result }) => {
  return result && <div>
  <p>{result_match(result.results.eipobject_identification, EIP_SUCCESS, EIP_FAILURE, EIP_SUCCESS_MESSAGE, EIP_FAILURE_MESSAGE)}</p>
  <p>{result_match(result.results.signature_verification, SIG_SUCCESS, SIG_FAILURE, SIG_SUCCESS_MESSAGE, SIG_FAILURE_MESSAGE, NO_SIG_PRESENT_MESSAGE)}</p>
  <p>{result_match(result.results.merkle_proof_verification, PROOF_SUCCESS, PROOF_FAILURE, PROOF_SUCCESS_MESSAGE, PROOF_FAILURE_MESSAGE)}</p>
  <p>{result_match(result.status, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_SUCCESS_MESSAGE, SEARCH_FAILURE_MESSAGE, SEARCH_ERROR_MESSAGE)}</p>
  </div>
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      /* Default values */
      eipobject: '', /* this value is a string */
      signer: '0xCcccCcccCccccCCCcC',
      proof: '',
      loading: false,
      result: false,
    };
  }

  
/*
result_dict = {
            'eipobject_identification': 'NOT_ATTEMPTED',
            'signature_verification': 'NOT_ATTEMPTED',
            'merkle_proof_verification': 'NOT_ATTEMPTED',
        }
        status = 'SEARCH_IN_PROGRESS'
        signature = ''
        res = {
            'results': result_dict,
            'status': status,
            'confirmed_signature', signature
        } # dict
*/

  handleSubmit = async (result) => {
    result.preventDefault();
    this.setState({loading: true});
    this.setState({result: false})
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    const res = await fetch('http://localhost:5000/search', {
        method: 'post',
        headers: head,
        body: JSON.stringify({
          eipobject: JSON.stringify(this.state.eipobject), 
          signer: this.state.signer,
          proof: JSON.stringify(this.state.proof)
      }),
    });
    const data = await res.json();
    this.setState({result: data});
    this.setState({loading: false});
  }

  updateInput = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <p>Proof: {this.state.proof}</p>
          <p>Signer: {this.state.signer}</p>
          <p>EIP712 Object: {this.state.eipobject}</p>
        </div>
        <form onSubmit={this.handleSubmit}>
        <FormWrap>
          <Label>Merkle Proof Text</Label>
          <TextAreaField
            type="text"
            rows="9"
            name="proof"
            label="Merkle Proof Text"
            value={this.state.proof}
            //component={InputField}
            placeholder="{}" /* JSON Object */
            onChange={this.updateInput}
          />
          <Label>Account Address</Label>
          <InputField
            type="text"
            name="signer"
            label="Signer"
            value={this.state.signer}
            //component={InputField}
            placeholder="Account Signer"
            onChange={this.updateInput}
          />
          <Label>EIP712 Object</Label>
          <TextAreaField
            rows="9"
            name="eipobject"
            label="EIP712 Object"
            placeholder="{}"
            value={this.state.eipobject}
            //component={InputField}
            onChange={this.updateInput}
          />
          <Button
            type="submit"
            data-testid="search-button"
            primary
          >
            Search
          </Button>
          </FormWrap>
        </form>
        <ResultWrap rows = "6">
        {this.state.result && <Result result={this.state.result}/>}
        </ResultWrap>
        {this.state.loading && <p>Getting results...</p>}
      </React.Fragment>
    );
  }
}


export default SearchForm;
