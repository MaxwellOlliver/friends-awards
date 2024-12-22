import * as YupCore from "yup";

const translate = {
  mixed: {
    default: "Campo inválido.",
    required: "Campo obrigatório.",
    notType: "Campo inválido.",
    oneOf: "Este campo não corresponde. ",
    max: "Esse campo deve ser menor que ${max}.",
    min: "Esse campo deve ser maior que ${min}.",
  },
  string: {
    length: "Esse campo deve ter exatamente ${length} caracteres",
    email: "Esse campo precisa ser um email válido",
    max: "Esse campo deve ter no máximo ${max} caracteres.",
    min: "Esse campo deve ter no mínimo ${min} caracteres.",
    url: "Esse campo precisa ser uma url válida",
  },
  number: {
    max: "Esse campo deve ser menor ou igual a ${max}.",
    min: "Esse campo deve ser maior ou igual a ${min}.",
    positive: "Esse campo deve ser um número positivo",
    integer: "Esse campo deve ser um número inteiro",
    lessThan: "Esse campo deve ser menor que ${less}",
  },
  array: {
    max: "Selecione no máximo ${max}.",
    min: "Selecione pelo menos ${min}.",
  },
};

YupCore.setLocale(translate);

export { YupCore };
