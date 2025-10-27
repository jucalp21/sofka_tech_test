export type ApiTask = {
  id: string;
  titulo: string;
  descripcion: string | null;
  estado: "Pendiente" | "EnProgreso" | "Completada";
  createdAt: string;
  updatedAt: string;
};

const esToEn: Record<
  ApiTask["estado"],
  "pending" | "in-progress" | "completed"
> = {
  Pendiente: "pending",
  EnProgreso: "in-progress",
  Completada: "completed",
};

const enToEs: Record<
  "pending" | "in-progress" | "completed",
  ApiTask["estado"]
> = {
  pending: "Pendiente",
  "in-progress": "EnProgreso",
  completed: "Completada",
};

export const TaskApiAdapter = {
  toDomain(api: ApiTask) {
    return {
      id: api.id,
      title: api.titulo,
      description: api.descripcion ?? undefined,
      status: esToEn[api.estado],
    };
  },
  toApiCreate(domain: { title: string; description?: string }) {
    return { titulo: domain.title, descripcion: domain.description };
  },
  toApiPatch(
    patch: Partial<{
      title: string;
      description?: string;
      status?: "pending" | "in-progress" | "completed";
    }>
  ) {
    const body: any = {};
    if (patch.title !== undefined) body.titulo = patch.title;
    if (patch.description !== undefined) body.descripcion = patch.description;
    if (patch.status) body.estado = enToEs[patch.status];
    return body;
  },
  toApiEstado(status: "pending" | "in-progress" | "completed") {
    return enToEs[status];
  },
};
