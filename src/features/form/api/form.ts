'use server';

import {
  batchAnswersSchema,
  formSchema,
  mimimumFormsSchema,
  questionsSchema,
} from '../types/formSchema';
import type { BatchAnswer, Form, FormQuestion } from '../types/formSchema';

const apiServerUrl = 'http://localhost:9000';

export const getForms = async (token: string) => {
  const response = await fetch(`${apiServerUrl}/forms`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  return mimimumFormsSchema.parse(await response.json());
};

export const getForm = async (formId: number, token: string): Promise<Form> => {
  const response = await fetch(`${apiServerUrl}/forms/${formId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  return formSchema.parse(await response.json());
};

export const getFormQuestions = async (
  formId: number,
  token: string
): Promise<FormQuestion[]> => {
  const response = await fetch(`${apiServerUrl}/forms/${formId}/questions`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  return questionsSchema.parse(await response.json());
};

export const postAnswers = async (
  form_id: number,
  answers: { question_id: number; answer: string }[],
  token: string
): Promise<boolean> => {
  const answersJson = JSON.stringify({
    form_id: Number(form_id),
    answers,
  });

  const response = await fetch(`${apiServerUrl}/forms/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: answersJson,
    cache: 'no-cache',
  });

  return response.ok;
};

export const getAllAnswers = async (token: string): Promise<BatchAnswer[]> => {
  const response = await fetch(`${apiServerUrl}/forms/answers`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  return batchAnswersSchema.parse(await response.json());
};