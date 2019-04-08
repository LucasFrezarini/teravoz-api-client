interface Data {
  contacts: number[];
  calls: Call[];
}

export interface Call {
  type: string;
  call_id: string;
  code: string;
  direction: string;
  our_number: string;
  their_number: string;
  their_number_type: string;
  timestamp: string;
}

export default Data;
