import { handleResponse, handleError } from "./api.utils";

const base_url = process.env.BASE_URL + 'trials/';

export function getTrials() {
  return fetch(base_url)
    .then(handleResponse)
    .catch(handleError);
}

export function saveTrials(trial, valueSelected) {
  const value = parseInt(trial[valueSelected]) + 1 ;
  trial[valueSelected] =  value;
  return fetch(base_url + trial.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(trial)
  })
    .then(handleResponse)
    .catch(handleError);
}
