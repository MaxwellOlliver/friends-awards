import { useLogStore } from "@/store/log-store";

export const LogsPanel = () => {
  const logs = useLogStore((s) => s.logs);

  function formatTimestamp(date: Date) {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${hour}:${minute}:${second}`;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Logs</h1>
      <div className="flex flex-col gap-4 w-full h-[40dvh] overflow-y-scroll">
        {logs.length === 0 && (
          <span className="text-gray-500">Nenhum log registrado</span>
        )}
        {logs.map((log, index) => (
          <div className="flex gap-2 text-sm" key={index}>
            <span className="mr-2 text-gray-500">
              {formatTimestamp(log.createdAt)}
            </span>
            <span className="text-gray-300">{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
