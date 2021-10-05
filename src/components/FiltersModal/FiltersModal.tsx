import React, { useState, useEffect } from 'react';
import "./filtersModal.scss";
import Modal from "../Modal/Modal";
import { Age, Filters, Types } from "../../types/global";
import { useSelector, useDispatch } from "react-redux";
import { LOCAL_STORAGE_FILTERS_KEY, FILTER_TYPES } from "../../types/constants";
import states from "../../assets/states.json";
import { RootState } from "../../redux/store";
import * as petsTypes from "../../redux/types/petsTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowRestore, faSave } from '@fortawesome/free-solid-svg-icons';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersModal: React.FC<Props> = ({ open, setOpen }) => {  
  const ANY_SELECT_VALUE = "Any";
  const { filters } = useSelector((state: RootState) => state.petsReducer);
  const [filtersForSelectedType, setFiltersForSelectedType] = useState<Types|null>(null);
  const [formValues, setFormValues] = useState<Filters>({
    type: filters && filters.type ? filters.type : FILTER_TYPES[0].type,
    age: filters && filters.age ? filters.age : null,
    coat: filters && filters.coat ? filters.coat : null,
    color: filters && filters.color ? filters.color : null,
    gender: filters && filters.gender ? filters.gender : null,
    location: filters && filters.location ? filters.location : null,
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Set available filter types based on selected pet type
    const types = FILTER_TYPES.find((filterType) => {
      return filterType.type === formValues.type;
    });
    if (types) setFiltersForSelectedType(types);
  }, [formValues.type]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      coat: null,
      color: null,
      gender: null,
    });
  }, [filtersForSelectedType]);

  useEffect(() => {
    const filters = localStorage.getItem(LOCAL_STORAGE_FILTERS_KEY);
    if (filters) {
      setFormValues({ ...JSON.parse(filters) });
      dispatch({ 
        type: petsTypes.UPDATE_FILTERS, 
        payload: { ...JSON.parse(filters) }, 
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: petsTypes.UPDATE_FILTERS,
      payload: formValues,
    });
    localStorage.setItem(LOCAL_STORAGE_FILTERS_KEY, JSON.stringify(formValues));
    setOpen(false);
  };  

  const capitalizeFirstLetter = (text: string): string => {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
  };  

  const handleReset = () => {
    dispatch({ type: petsTypes.CLEAR_FILTERS });
    setFormValues({
      age: null,
      coat: null,
      color: null,
      gender: null,
      location: null,
      type: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_FILTERS_KEY);
    setOpen(false);
  };
 
  return (
    <Modal open={open} setOpen={setOpen} header="Filters">
      <form className="filtersForm" onSubmit={handleSubmit}>
        <div className="filtersForm__formGroup">
          <label htmlFor="type" className="filtersForm__formGroup__label">Type</label>
          <select 
            id="type" 
            className="filtersForm__formGroup__select"
            onChange={
              (e) => setFormValues({ ...formValues, type: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.type || undefined}
          >
            {FILTER_TYPES.map(({ type }) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="age" className="filtersForm__formGroup__label">Age</label>
          <select 
            id="age" 
            className="filtersForm__formGroup__select" 
            onChange={
              (e) => setFormValues({ ...formValues, age: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.age || undefined}
          >
              <option value={ANY_SELECT_VALUE}>{ANY_SELECT_VALUE}</option>
              <option value={Age.Baby}>{capitalizeFirstLetter(Age.Baby)}</option>
              <option value={Age.Young}>{capitalizeFirstLetter(Age.Young)}</option>
              <option value={Age.Adult}>{capitalizeFirstLetter(Age.Adult)}</option>
              <option value={Age.Senior}>{capitalizeFirstLetter(Age.Senior)}</option>
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="coat" className="filtersForm__formGroup__label">Coat</label>
          <select 
            id="coat" 
            className="filtersForm__formGroup__select" 
            onChange={
              (e) => setFormValues({ ...formValues, coat: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.coat || undefined}
          >
            <option value={ANY_SELECT_VALUE}>{ANY_SELECT_VALUE}</option>
            {filtersForSelectedType && filtersForSelectedType.coats.map((coat) => (
              <option value={coat} key={coat}>
                {coat}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="color" className="filtersForm__formGroup__label">Color</label>
          <select 
            id="color" 
            className="filtersForm__formGroup__select" 
            onChange={
              (e) => setFormValues({ ...formValues, color: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.color || undefined}
          >
            <option value={ANY_SELECT_VALUE}>{ANY_SELECT_VALUE}</option>
            {filtersForSelectedType && filtersForSelectedType.colors.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="gender" className="filtersForm__formGroup__label">Gender</label>
          <select 
            id="gender" 
            className="filtersForm__formGroup__select" 
            onChange={
              (e) => setFormValues({ ...formValues, gender: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.gender || undefined}
          >
            <option value={ANY_SELECT_VALUE}>{ANY_SELECT_VALUE}</option>
            {filtersForSelectedType && filtersForSelectedType.genders.map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__formGroup">
          <label htmlFor="state" className="filtersForm__formGroup__label">US State</label>
          <select 
            id="state" 
            className="filtersForm__formGroup__select" 
            onChange={
              (e) => setFormValues({ ...formValues, location: e.target.value === ANY_SELECT_VALUE ? null : e.target.value })
            }
            value={formValues.location || undefined}
          >
            <option value={ANY_SELECT_VALUE}>{ANY_SELECT_VALUE}</option>
            {states.map((state) => (
              <option value={state.abbreviation} key={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filtersForm__buttonsContainer">
          <button 
            type="button" 
            className="filtersForm__buttonsContainer__button filtersForm__buttonsContainer__button--reset"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faWindowRestore} className="filtersForm__buttonsContainer__button__icon" />
            Reset
          </button>
          <button 
            type="submit" 
            className="filtersForm__buttonsContainer__button filtersForm__buttonsContainer__button--submit"
          >
            <FontAwesomeIcon icon={faSave} className="filtersForm__buttonsContainer__button__icon" />
            Save filters
          </button>
        </div>  
      </form>
    </Modal>
  )
}

export default FiltersModal;