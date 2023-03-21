import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export interface Alert {
  id: number;
  status: "danger" | "success";
  title: string;
  text: string;
}

export interface IPayload extends Omit<Alert, 'id'> {
  timeout?: number;
  critical?: boolean;
}

export const useAlertsStore = defineStore("alerts", () => {
  const alerts = reactive<Alert[]>([]);
  const lastID = ref(0);

  const addAlert = (payload: IPayload) => {
    alerts.push({
      id: ++lastID.value,
      status: payload.status,
      title: payload.title,
      text: payload.text,
    });

    const id = lastID.value;

    if (!payload.critical) {
      setTimeout(() => {
        removeAlert(id);
      }, payload.timeout ?? 3000);
    }
  };

  const removeAlert = (id: number) => {
    const index = alerts.findIndex((alert) => alert.id === id);
    alerts.splice(index, 1);
  };

  return {
    alerts,
    addAlert,
    removeAlert,
  };
});
