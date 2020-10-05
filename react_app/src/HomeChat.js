import React, { Component } from "react";
import ReactLoading from "react-loading";
import ModalHome from "./components/ModalHome";
import $ from "jquery";
class HomeChat extends Component {
  state = {
    isloading: false,
    error: false,
    data: undefined,
    modalIsOpen: false,
    courseId: this.props.match.params.courseId,
    taskId: this.props.match.params.taskId,
  };

  componentDidMount() {
    this.fetchTaskStatus();
  }

  fetchTaskStatus = async () => {
    this.setState({ isloading: true, error: false });
    try {
      let url =
        "/plugins/un_colab/api/score_task_user?" +
        $.param({ course_id: this.state.courseId, task_id: this.state.taskId });
      let taskStatusUser = await fetch(url);
      let data = await taskStatusUser.json();
      this.setState({ isloading: false, data: data.programmer });
    } catch (error) {
      this.setState({ isloading: false, error: true });
    }
  };
  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };

  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
    this.fetchTaskStatus();
  };

  render() {
    return (
      <div id="welcomepyn">
        {this.state.isloading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#94b43b"}
              height={"10%"}
              width={"10%"}
              className="loadding-chat"
            />
          </div>
        ) : null}
        <ModalHome
          isOpen={this.state.modalIsOpen}
          onClose={this.handleCloseModal}
          taskStatus={this.state.data}
          error={this.state.error}
        ></ModalHome>
        <h1>
          ¿Eres <strong style={{ color: "#00AF50" }}>programador</strong> o{" "}
          <strong style={{ color: "#00AF50" }}>novato</strong>?
        </h1>
        <h4>
          haz click{" "}
          <a href="#" onClick={this.handleOpenModal}>
            {" "}
            aquí{" "}
          </a>
          para saber la respuesta
        </h4>

        <p>Conoce algunas ventajas del aprendizaje colaborativo:</p>
        <ul>
          <li>Habilidades de trabajo en equipo</li>
          <li>Generación de nuevas ideas</li>
          <li>Aumento de productividad</li>
        </ul>
        <figure>
          <img
            src="https://cdn.lynda.com/course/751331/751331-637286254953365768-16x9.jpg"
            alt="collaborating programming"
          />
         
        </figure>

        
      </div>
    );
  }
}

export default HomeChat;
