import "./scss/App.scss";

import React, { ReactElement, useState } from "react";

import appstore from "/assets/dock/appstore.png";
import finder from "/assets/dock/finder.png";
import mail from "/assets/dock/mail.png";
import messages from "/assets/dock/messages.png";
import settings from "/assets/dock/systempreferences.png";
import terminal from "/assets/dock/terminal.png";
import trashbin from "/assets/dock/trashbin.png";

import { Desktop } from "./components/Desktop";
import { Dock } from "./components/Dock";
import { SnakeGame } from "./components/game/SnakeGame";
import { Header } from "./components/Header";
import { Finder } from "./components/Windows/Finder";
import { Mail } from "./components/Windows/Mail";

type Component = "finder" | "mail" | "snake";

function App() {
  const [component, setComponent] = useState<ReactElement[]>([]);
  const [items, setItems] = useState([
    "Finder",
    "Fichier",
    "Édition",
    "Présentation",
    "Aller",
    "Fenêtre",
    "Aide",
  ]);

  const closeWindow = (id: number) => {
    setComponent((components) => components.filter((c) => c.props.id !== id));
    changeHeader("finder");
  };

  const components: Record<
    Component,
    // eslint-disable-next-line no-unused-vars
    { component: (key: number) => ReactElement; header: string[] }
  > = {
    finder: {
      component: (key: number) => (
        <Finder
          id={key}
          key={key}
          name="finder"
          closeWindow={closeWindow}
          changeHeader={() => changeHeader("finder")}
        />
      ),
      header: [
        "Finder",
        "Fichier",
        "Édition",
        "Présentation",
        "Aller",
        "Fenêtre",
        "Aide",
      ],
    },
    mail: {
      component: (key: number) => (
        <Mail
          id={key}
          key={key}
          name="mail"
          closeWindow={closeWindow}
          changeHeader={() => changeHeader("mail")}
        />
      ),
      header: [
        "Mail",
        "Fichier",
        "Édition",
        "Présentation",
        "Boîte aux lettres",
        "Message",
        "Format",
        "Fenêtre",
        "Aide",
      ],
    },
    snake: {
      component: (key: number) => (
        <SnakeGame
          key={key}
          id={key}
          closeWindow={closeWindow}
          changeHeader={(e: any, name?: Component) =>
            changeHeader(name !== undefined ? name : "snake")
          }
        />
      ),
      header: ["Snake", "Aide"],
    },
  };

  const changeHeader = (name: Component) => {
    setItems(components[name].header);
  };

  const openWindow = (comp: Component) => {
    const key =
      component.length === 0 ? 0 : Number(component[component.length - 1].key) + 1;
    setItems(components[comp].header);
    setComponent([...component, components[comp].component(key)]);
  };

  return (
    <div className="App">
      <Header items={items} />
      <div className="content">
        <Desktop />
        {component}
        <Dock>
          <button onClick={() => openWindow("finder")}>
            <img src={finder} className="icon" alt="" />
          </button>
          <button onClick={() => openWindow("snake")}>
            <img src={appstore} className="icon" alt="" />
          </button>
          <button onClick={() => openWindow("mail")}>
            <img src={mail} className="icon" alt="" />
          </button>
          <button>
            <img src={messages} className="icon" alt="" />
          </button>
          <button>
            <img src={settings} className="icon" alt="" />
          </button>
          <button>
            <img src={terminal} className="icon" alt="" />
          </button>
          <button>
            <img src={trashbin} className="icon trashbin" alt="" />
          </button>
        </Dock>
      </div>
    </div>
  );
}

export default App;
