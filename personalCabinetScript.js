const selectorAnchor = ".src-features-trainer-trainerTasks-components-Tasks-components-Task--btnLink--ubr26";
const classSelector = ".src-features-trainer-trainerTasks-components-Tasks-components-Task--root--JucPV";
const sectionTag = document.querySelector("#app");

const cardList = Array.from(document.querySelectorAll(classSelector));
const cardListWzIndex = cardList.map( el => Object.assign(el, {tabIndex: 2}));

function getRangeCardListIterator(iterateCollection) {
  return {
    from: 0,
    to: iterateCollection.length - 1,

    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (this.current === undefined || this.current > this.to) {
        // инициализация состояния итерации
        this.current = this.from;
      }

      if (this.current <= this.to) {
        return {
          done: false,
          value: iterateCollection.at(++this.current)
        };
      } 
    },

    prev() {
      console.log("prev")
      if (this.current === undefined || this.current < this.from) {
        // инициализация состояния итерации
        this.current = this.to;
      }

      if (this.current >= this.from) {
        return {
          done: false,
          value: iterateCollection.at(--this.current)
        };
      }
    }
  }
};

function preparedNewTab(openTab) {
  openTab.onbeforeunload = (evt) => {
		openTab.opener.location.reload();
  }
}

function focus(element) {
	element.value.focus();
}
			
const cardListIterator = getRangeCardListIterator(cardListWzIndex)[Symbol.iterator]();

sectionTag.addEventListener("keydown", evt => {
  evt.preventDefault();
  
  if(evt.shiftKey) {
    if(evt.keyCode === 9) {
      focus(cardListIterator.prev())
      return
  	}	
  }
  if(evt.keyCode === 9) {
    focus(cardListIterator.next())
    return
  } 
})

sectionTag.addEventListener("keyup", evt => {
  evt.preventDefault()
})

sectionTag.addEventListener("keyup", evt => {
  evt.preventDefault()
  if(evt.keyCode === 13) {
    const actEl = document.activeElement;
    if(actEl) {
      const anchor = actEl.querySelector(selectorAnchor);
      if(anchor) {
				const {href} = anchor;
        const tab = window.open(href, '_blank');
        preparedNewTab(tab);
      }
    }
  }
})

cardListWzIndex.forEach( el => {
  el.addEventListener("focus", evt => {			
    const t = evt.target;
    const {href} = t.querySelector(selectorAnchor);
    const {offsetWidth, offsetHeight} = t;
    const iframeNode = getIframeNode(href, offsetWidth, offsetHeight);

    t.appendChild(iframeNode);
	})
    el.addEventListener("blur", evt => {
    const t = evt.target;
    t.removeChild(t.querySelector("iframe.iframe_with_preshowed"))
  })
})
  
function getIframeNode(src, offsetWidth, offsetHeight) {
  const frame = document.createElement("iframe");
  frame.setAttribute("src", src);
  frame.setAttribute("class", "iframe_with_preshowed");
  frame.style.width = offsetWidth + "px";
 	frame.style.height = "500px";
  frame.style.position = "absolute";
  frame.style.backgroundColor = "#fff"
  
  frame.style.top = offsetHeight + "px";
  frame.style.left = 0 + "px";
  frame.style.zIndex = 1000;
  frame.style.borderWidth = "1px";
  frame.style.borderStyle = "solid";
  frame.style.borderColor = "grey";
  frame.style.borderRadius = "15px";
  
  return frame;
}

/// Запрос к базе нетологии для получения данных
/**
 * Id - номер карточки, он же ссылка на кнопке
 */
fetch("https://netology.ru/backend/api/expert/homeworks/:id").then(data => data.json()).then(data => console.log(data));
  function appendCard(data) {
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
      crossorigin="anonymous"
    />
    <title>Static Template</title>
  </head>
  <body>
      <div class="container">
    <div class="row main-wrapper d-flex justify-content-center">
      ${data}
    </div>
  </div>
  </body>
  </html>
`;
  }

  const createCard = (data) => {
    const { solutions, last_user_action } = data;

    const anchorsTxt = "ссылок нет";
    if (solutions.length) {
      anchorsTxt = solutions
        .map(
          ({ title, link }) =>
            `<a href="${link}" class="card-link">${title}</a>`
        )
        .join();
    }

    return `<div class="card w-75 shadow">
        <div class="card-header bg-secondary bg-gradient text-light">
          ${last_user_action.user.fullname || "Безымянный"}
        </div>
        <div class="card-body">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          ${anchorsTxt}
        </div>
      </div>`;
  };

 /* Схема
  {
  "homework": {
    "id": 1262609,
    "status": "waiting_review",
    "score": null,
    "created_at": "2022-08-29T09:51:54.000Z",
    "updated_at": "2022-09-09T17:17:03.000Z",
    "last_payout_date": null,
    "can_review": false,
    "last_solution_submit": "2022-09-09T20:17:03+03:00"
  },
  "other_lesson_tasks": [
    {
      "id": 95968,
      "lesson_item_position": 1,
      "title": "Задание для итоговой работы по модулю \"HTML-верстка:с нуля до первого макета\"",
      "homework": null
    },
    {
      "id": 95964,
      "lesson_item_position": 8,
      "title": "Домашнее задание к занятию \"Позиционирование блочных элементов\"",
      "homework": {
        "id": 1286454,
        "link": "/trainer/task/1286454",
        "created_at": "2022-09-08T05:46:01.000Z",
        "updated_at": "2022-09-08T07:45:50.000Z",
        "status": "accepted",
        "score": "good",
        "lesson_task_complete_type": "individual",
        "can_review": false,
        "user_pass_individual_task": true
      }
    },
    {
      "id": 95963,
      "lesson_item_position": 10,
      "title": "Домашнее задание к занятию \"Теги для вёрстки структуры контента\"",
      "homework": {
        "id": 1278095,
        "link": "/trainer/task/1278095",
        "created_at": "2022-09-05T06:00:07.000Z",
        "updated_at": "2022-09-09T17:26:01.000Z",
        "status": "accepted",
        "score": "good",
        "lesson_task_complete_type": "individual",
        "can_review": false,
        "user_pass_individual_task": true
      }
    },
    {
      "id": 95962,
      "lesson_item_position": 11,
      "title": "Домашнее задание к занятию \"Контентные теги\"",
      "homework": {
        "id": 1267401,
        "link": "/trainer/task/1267401",
        "created_at": "2022-08-31T04:55:55.000Z",
        "updated_at": "2022-09-09T17:16:45.000Z",
        "status": "waiting_review",
        "score": null,
        "lesson_task_complete_type": "individual",
        "can_review": false,
        "user_pass_individual_task": false
      }
    },
    {
      "id": 95965,
      "lesson_item_position": 11,
      "title": "Домашнее задание к занятию \"Нестандартные элементы форм\"",
      "homework": null
    },
    {
      "id": 95966,
      "lesson_item_position": 11,
      "title": "Домашнее задание к занятию \"Позиционирование flex-элементов\"",
      "homework": null
    }
  ],
  "user": {
    "id": 8204284,
    "full_name": "Василий",
    "avatar_path": "/images2/nouser.jpg"
  },
  "group_users": [],
  "lesson_task": {
    "task_type": "common",
    "review_type": "any_expert",
    "complete_type": "individual"
  },
  "lesson_items": [
    {
      "id": 1053926,
      "type": "webinar",
      "title": "Введение в вёрстку",
      "starts_at": "2022-08-26T16:00:00.000Z",
      "ends_at": "2022-08-26T18:00:00.000Z",
      "video_url": "https://kinescope.io/a65dfba9-9617-493d-bdcb-4f1364e35af4",
      "status": "passed",
      "youtube_video_id": null,
      "translation_adapter": "webinar_ru_native"
    },
    {
      "id": 1053927,
      "type": "attachment",
      "title": "Презентация к занятию \"Введение в вёрстку\"",
      "content": "",
      "files": [
        {
          "id": 31065,
          "name": "Презентация к занятию \"Введение в вёрстку\"",
          "link": "https://u.netology.ngcdn.ru/backend/uploads/lms/attachments/files/data/31065/HTML-77_%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B2_%D0%B2%D1%91%D1%80%D1%81%D1%82%D0%BA%D1%83.pdf",
          "extension": "pdf",
          "size": "2,6 МБ"
        }
      ]
    },
    {
      "id": 1053928,
      "type": "poll",
      "title": "Обратная связь по вебинару"
    },
    {
      "id": 1053929,
      "type": "test",
      "title": "Тест к занятию \"Введение в вёрстку\""
    },
    {
      "id": 1053930,
      "type": "task",
      "title": "Домашнее задание к занятию \"Введение в вёрстку\""
    },
    {
      "id": 1053931,
      "type": "video",
      "title": "Инструменты разработчика",
      "video_url": "https://kinescope.io/cd69a730-cc16-4a25-b247-b143b1544051"
    }
  ],
  "task": {
    "title": "Домашнее задание к занятию \"Введение в вёрстку\"",
    "content": "Коллеги, всем добрый день!\r\n\r\nПеред выполнением ознакомьтесь с [правилами оформления кода](https://github.com/netology-code/codestyle). Работы, код которых не оформлен по правилам, будут отправлены на доработку без проверки.\r\n\r\nВаше домашнее задание доступно [по ссылке](https://github.com/netology-code/html-2-homeworks/tree/master/introduction-html-css).\r\n\r\nЖелаю успехов при его выполнении!\r\n\r\nСвои вопросы задавайте в чате группы.\r\n"
  },
  "program": {
    "id": 29835,
    "title": "HTML-верстка: с нуля до первого макета",
    "pretty_urlcode": "HTML-77"
  },
  "solutions": [
    {
      "id": 2094056,
      "solution_type": "link",
      "created_at": "2022-08-29T10:52:10.000Z",
      "title": "решение первого задания",
      "updated_at": "2022-09-09T17:17:03.000Z",
      "link": "https://codepen.io/Vasminog/pen/JjLQVaq"
    },
    {
      "id": 2094260,
      "solution_type": "link",
      "created_at": "2022-08-29T11:40:41.000Z",
      "title": "решение второй задачи",
      "updated_at": "2022-09-09T17:17:03.000Z",
      "link": "https://codepen.io/Vasminog/full/qBozGdE"
    },
    {
      "id": 2094261,
      "solution_type": "link",
      "created_at": "2022-08-29T11:40:41.000Z",
      "title": "третье домашнее задание",
      "updated_at": "2022-09-09T17:17:03.000Z",
      "link": "https://codepen.io/Vasminog/full/VwXJOpK"
    }
  ],
  "comments": [
    {
      "id": 2432674,
      "comment_type": "user",
      "message": "Единственное в чем не разобрался как в кодепен делать отступы красиво ",
      "created_at": "2022-08-29T11:40:41.000Z",
      "updated_at": "2022-08-29T11:40:41.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "id": 2446483,
      "comment_type": "expert",
      "message": "Здравствуйте, Василий!\r\n\r\nДобро пожаловать на курс по вёрстке!\r\n\r\nОтступы можно расставлять при помощи `Tab`, или же сделать это автоматически: \r\n\r\n![](https://i.gyazo.com/4ae97b9163e6fa7d6f97c5f02714b615.gif)\r\n\r\nПо нажатию кнопки код оформляется в соответствии с принятым в сообществе программистов стилем оформления и в удобном для чтения виде.\r\n\r\n---\r\n\r\nВы здорово поработали над первым заданием! Однако теги `<p>` и `<main>` слились в один:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63275/image.png)\r\n\r\nНужно их разделить, а именно сделать так, чтобы самым старшим тегом был `<main class=\"content\"></main>`. В нём бы лежал `<p></p>`. А в нём уже тест со всеми остальными тегами.\r\n\r\nТег `<p>` — параграф — в вёрстке имеет такое же значение, как и параграфы в книгах: это одно или несколько предложений, выражающих связную мысль. Тег `<main>` родственнен тегу `<div>`, это контейнер: он предназначен для того, чтобы хранить в себе содержимое: картинки, параграфы и прочее.\r\n\r\n---\r\n\r\nВо втором задании в селекторе этого правила нужен не `p`, а `body`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63276/image.png)\r\n\r\n---\r\n\r\nВ третьем задании не хватает дефиса в имени класса `card-name`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63278/image.png)",
      "created_at": "2022-09-01T09:31:35.000Z",
      "updated_at": "2022-09-01T09:31:35.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg"
      }
    }
  ],
  "events": [
    {
      "event": "start_doing",
      "created_at": "2022-08-29T09:51:54.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "event": "solution_submit",
      "created_at": "2022-08-29T10:52:10.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "event": "return_to_progress",
      "created_at": "2022-08-29T11:18:39.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "event": "solution_submit",
      "created_at": "2022-08-29T11:40:41.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "event": "take_for_review",
      "created_at": "2022-09-01T09:21:38.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg"
      }
    },
    {
      "event": "to_rework",
      "created_at": "2022-09-01T09:31:35.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg"
      }
    },
    {
      "event": "start_rework",
      "created_at": "2022-09-01T18:29:48.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    },
    {
      "event": "solution_submit",
      "created_at": "2022-09-09T17:17:03.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg"
      }
    }
  ],
  "last_user_action": {
    "message": null,
    "created_at": "2022-09-09T17:17:03.000Z",
    "user": {
      "id": 8204284,
      "full_name": "Василий",
      "avatar_path": "/images2/nouser.jpg"
    }
  },
  "last_reviewer_action": {
    "message": "Здравствуйте, Василий!\r\n\r\nДобро пожаловать на курс по вёрстке!\r\n\r\nОтступы можно расставлять при помощи `Tab`, или же сделать это автоматически: \r\n\r\n![](https://i.gyazo.com/4ae97b9163e6fa7d6f97c5f02714b615.gif)\r\n\r\nПо нажатию кнопки код оформляется в соответствии с принятым в сообществе программистов стилем оформления и в удобном для чтения виде.\r\n\r\n---\r\n\r\nВы здорово поработали над первым заданием! Однако теги `<p>` и `<main>` слились в один:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63275/image.png)\r\n\r\nНужно их разделить, а именно сделать так, чтобы самым старшим тегом был `<main class=\"content\"></main>`. В нём бы лежал `<p></p>`. А в нём уже тест со всеми остальными тегами.\r\n\r\nТег `<p>` — параграф — в вёрстке имеет такое же значение, как и параграфы в книгах: это одно или несколько предложений, выражающих связную мысль. Тег `<main>` родственнен тегу `<div>`, это контейнер: он предназначен для того, чтобы хранить в себе содержимое: картинки, параграфы и прочее.\r\n\r\n---\r\n\r\nВо втором задании в селекторе этого правила нужен не `p`, а `body`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63276/image.png)\r\n\r\n---\r\n\r\nВ третьем задании не хватает дефиса в имени класса `card-name`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63278/image.png)",
    "message_id": 2446483,
    "edit_ability_till": "2022-09-01T09:46:35.000Z",
    "type": "to_rework",
    "created_at": "2022-09-01T09:31:35.000Z",
    "user": {
      "id": 5267544,
      "full_name": "Светлана Коробцева",
      "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg"
    }
  },
  "chronology": [
    {
      "created_at": "2022-08-29T09:51:54.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "start_doing"
    },
    {
      "created_at": "2022-08-29T10:52:10.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "solution_submit"
    },
    {
      "created_at": "2022-08-29T11:18:39.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "return_to_progress"
    },
    {
      "created_at": "2022-08-29T11:40:41.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "solution_submit"
    },
    {
      "created_at": "2022-08-29T11:40:41.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "comment",
      "message": "Единственное в чем не разобрался как в кодепен делать отступы красиво ",
      "event": null
    },
    {
      "created_at": "2022-09-01T09:21:38.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg",
        "has_photo": true
      },
      "type": "event",
      "message": null,
      "event": "take_for_review"
    },
    {
      "created_at": "2022-09-01T09:31:35.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg",
        "has_photo": true
      },
      "type": "event",
      "message": null,
      "event": "to_rework"
    },
    {
      "created_at": "2022-09-01T09:31:35.000Z",
      "user": {
        "id": 5267544,
        "full_name": "Светлана Коробцева",
        "avatar_path": "https://u.netology.ngcdn.ru/backend/uploads/legacy/users/avatar/5267544/251a977423b1655e.jpg",
        "has_photo": true
      },
      "type": "comment",
      "message": "Здравствуйте, Василий!\r\n\r\nДобро пожаловать на курс по вёрстке!\r\n\r\nОтступы можно расставлять при помощи `Tab`, или же сделать это автоматически: \r\n\r\n![](https://i.gyazo.com/4ae97b9163e6fa7d6f97c5f02714b615.gif)\r\n\r\nПо нажатию кнопки код оформляется в соответствии с принятым в сообществе программистов стилем оформления и в удобном для чтения виде.\r\n\r\n---\r\n\r\nВы здорово поработали над первым заданием! Однако теги `<p>` и `<main>` слились в один:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63275/image.png)\r\n\r\nНужно их разделить, а именно сделать так, чтобы самым старшим тегом был `<main class=\"content\"></main>`. В нём бы лежал `<p></p>`. А в нём уже тест со всеми остальными тегами.\r\n\r\nТег `<p>` — параграф — в вёрстке имеет такое же значение, как и параграфы в книгах: это одно или несколько предложений, выражающих связную мысль. Тег `<main>` родственнен тегу `<div>`, это контейнер: он предназначен для того, чтобы хранить в себе содержимое: картинки, параграфы и прочее.\r\n\r\n---\r\n\r\nВо втором задании в селекторе этого правила нужен не `p`, а `body`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63276/image.png)\r\n\r\n---\r\n\r\nВ третьем задании не хватает дефиса в имени класса `card-name`:\r\n\r\n![](https://u.netology.ngcdn.ru/backend/uploads/markdown_images/image/63278/image.png)",
      "event": null
    },
    {
      "created_at": "2022-09-01T18:29:48.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "start_rework"
    },
    {
      "created_at": "2022-09-09T17:17:03.000Z",
      "user": {
        "id": 8204284,
        "full_name": "Василий",
        "avatar_path": "/images2/nouser.jpg",
        "has_photo": false
      },
      "type": "event",
      "message": null,
      "event": "solution_submit"
    }
  ]
}
 */

///// Для страницы студента
// const editorField = document.querySelector(".CodeMirror-scroll")
// const takingButton = document.querySelector(".src-features-trainer-trainerTask-components-Task-components-Header--buttonReview--ts9ZK")
// const sectionTag = document.querySelector("#app");

// const clickButton = evt => {
//   evt.preventDefault();
//   if(evt.keyCode === 13) {
//     takingButton.click();
//     sectionTag.removeEventListener("keydown", clickButton);
//   }
// }

// const focusedToButton = evt => {
//   evt.preventDefault();
//   if(evt.keyCode === 9) {
//     const takingButtonWithIndex = Object.assign(takingButton, {tabIndex: 100});
//     takingButtonWithIndex.focus();
//     sectionTag.removeEventListener("keydown", focusedToButton);
//   }
// }

// sectionTag.addEventListener('keydown', clickButton);
// sectionTag.addEventListener('keydown', focusedToButton);	



/// для отображения попапа кабинета 
const button = document.querySelectorAll(".src-features-trainer-trainerTasks-components-Tasks-components-Task--btnLink--ubr26");

button.forEach( el => el.addEventListener("mouseover", evt => {
  const t = evt.target;
  const {href} = t.closest("a");
  const iframeNode = t.getIframeNode(href, t.getBoundingClientRect());
  t.closest("div").appendChild(iframeNode);

}))


function getIframeNode(src, coord) {
  const {height, left, right, width, x, y} = coord;
  const frame = document.createElement("IFRAME");
  frame.addAttribure("src", src);
  frame.addAttribure("class", src);
 	frame.style.width = "200px";
  frame.style.height = "500px";
  frame.style.display = "absolute";
  
  frame.style.top = y + "px";
  frame.style.right = right + "px";
  
  return frame;
}
