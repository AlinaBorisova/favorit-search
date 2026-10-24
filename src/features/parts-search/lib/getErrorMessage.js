const API_MESSAGES = {
  "Request quota exceeded!":
    "Превышен лимит запросов для этого ключа доступа (для грузовых запчастей он ограничен).",
  "Invalid key client!": "Сервис не принял ключ доступа.",
  "Empty key!": "Не указан ключ доступа.",
};

export function getErrorMessage(error) {
  if (!error) return null;

  if (error.status === "API_ERROR") {
    return (
      API_MESSAGES[error.message] ?? "Сервис вернул ошибку. Попробуйте ещё раз."
    );
  }
  if (error.status === "FETCH_ERROR") {
    return "Не удалось связаться с сервером. Проверьте подключение к сети.";
  }
  return "Что-то пошло не так. Попробуйте ещё раз.";
}
