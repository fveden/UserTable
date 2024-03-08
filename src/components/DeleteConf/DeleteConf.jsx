import "./deleteConf.css";
function DeleteConf({onAgree, onDisagree}) {
  return (
    <section className="confirmation">
      <h3 className="confirmation__title">
        Вы уверены, что хотите удалить пользователя?
      </h3>
      <div className="confirmation-button-block">
        <button
          onClick={onAgree}
          className="confirmation-button-block__button agreement"
        >
          Да
        </button>
        <button
          onClick={onDisagree}
          className="confirmation-button-block__button disagreement"
        >
          Нет
        </button>
      </div>
    </section>
  );
}

export default DeleteConf;
