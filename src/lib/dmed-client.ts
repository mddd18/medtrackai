// src/lib/dmed-client.ts
// D-Med va AI API'larga so'rovlar yuborish uchun mijoz
// =====================================================
import type {
  Patient,
  Diagnosis,
  Allergy,
  Prescription,
  MassageProtocol,
  DailyTask,
  NutriCareAdvice,
  RiskAnalysis,
} from '@/types';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'API error');
  return json.data as T;
}

export const dmedClient = {
  fetchPatient: () =>
    api<{ patient: Patient; diagnosis: Diagnosis; allergies: Allergy[] }>(
      '/api/dmed/patient'
    ),

  fetchPrescriptions: () =>
    api<{ prescriptions: Prescription[]; protocols: MassageProtocol[] }>(
      '/api/dmed/prescriptions'
    ),

  fetchTasks: () => api<DailyTask[]>('/api/tasks'),

  updateTask: (id: string, status: 'completed' | 'skipped' | 'pending') =>
    api(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  fetchNutriCare: () =>
    api<NutriCareAdvice>('/api/ai/nutri-care', { method: 'POST' }),

  fetchRiskAnalysis: (tasks: DailyTask[]) =>
    api<RiskAnalysis>('/api/ai/risk-analysis', {
      method: 'POST',
      body: JSON.stringify({ tasks }),
    }),
};
