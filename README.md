

# Indie-Go By William Short

### [Vist Barista](https://barista-project.herokuapp.com/) 

**Table of contents**
* [Overview](#overview)
* [Backend](#backend)
* [Frontend](#frontend)


<a name="overview"></a>
# Barista overview
Barista is a fullstack web-app using [React](https://reactjs.org/), [React-Redux](https://react-redux.js.org/), [Node.js/Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/)  

Barista is an Untapped clone where users are able to see local coffee shops and post about drinks they are having.


Users are able to:
* Post checkins on what they are currently drinking at local coffe shops.
* Leave comments on other users checkins.
* Browse through up to 10 local coffee shops by google map's API.

## Homepage

![homepage](https://user-images.githubusercontent.com/16979047/148467843-c692bfa0-9791-41a7-b2ed-6eb7d4261ecf.PNG)

## Drinks

![search](https://user-images.githubusercontent.com/16979047/148468100-483abc1e-9849-4425-a781-29f334cb9212.PNG)

## Coffee Shops

![gamepage](https://user-images.githubusercontent.com/16979047/148467909-d2f6c29e-15f6-4035-8751-0d5fbb82e1ce.PNG)

# Architecture

## Dataflow

<img width="1360" alt="DataFlow" src="https://user-images.githubusercontent.com/16979047/147791919-5b24d739-616a-4e79-aba8-6e74f8785440.png">

<a name="backend"></a>
## Backend

### Database ([PostgreSQL](https://www.postgresql.org/))

The database for this app was set up to communicate with the server to store data for persistance between sessions and to serve back that data for Checkins, Drinks and Comments details

<img src="https://res.cloudinary.com/dc9htgupc/image/upload/v1636975264/samples/r0tsl4rm9wmschhl41zu.png"
  alt="Database Scheme"/>
  
Sequelize was used to create models to easily store and harvest data from the database.

Game listing model:
```js
// in /backend/db/models/checkin.js
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define(
    "Checkin",
    {
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rating: DataTypes.NUMERIC,
      drink_id: DataTypes.INTEGER,
      location: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
    },
    {}
  );
  Checkin.associate = function (models) {
    Checkin.belongsTo(models.Drink, { foreignKey: "drink_id" });
    Checkin.belongsTo(models.User, { foreignKey: "owner_id" });
    Checkin.hasMany(models.Comment, {
      foreignKey: "checkin_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  Checkin.all = async function (Drink, User, Comment) {
    const checkins = await Checkin.findAll({
      include: [Drink, User, { model: Comment, include: User }],
    });
    return checkins;
  };
```
  
### Server ([Node.js/Express](https://expressjs.com/))

The server for this app was coded using Node.js and Express to create routes responsible for dataflow between the frontend and the database.  

Checkin `POST` route:
```js
// in backend/routes/api/checkins.js
router.post(
  "/",
  checkCheckin,
  asyncHandler(async (req, res) => {
    let { rating, description, drinkId, image, ownerId, location } = req.body;
    let checkin = await Checkin.makeNewCheckin(
      {
        rating: +rating,
        description,
        drink_id: drinkId,
        image,
        owner_id: ownerId,
        location,
      },
      Drink,
      User
    );

    res.json(checkin);
  })
);
```

<a name="frontend"></a>
## Frontend


## React ([React](https://reactjs.org/))

The front end of Barista is all based in react.  React is one of the most popular JS frameworks for full stack aplications.  Using React Components with Redux state Barista serves all the data from the backend to be viewed by the user.

Checkin component:

![image](https://user-images.githubusercontent.com/16979047/148469876-9515f3e7-fd91-4dec-88dc-bd0eaab2925d.png)
```js
// in frontend/src/components/CheckinFeed/Checkin.js
export default function Checkin({ data }) {
  let {
    description,
    checkinLocation,
    image,
    rating,
    owner_id,
    id,
    Drink,
    User,
    Comments,
  } = data;

  const [updateDisc, setUpdateDisc] = useState(description);
  const [expand, setExpand] = useState(false);
  let height = { height: "110px" };
  useEffect(() => {
    if (expand) {
      height = { height: "fit-content" };
    } else {
      height = { height: "110px" };
    }
  }, [expand]);
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  async function deleteCheckinAction(id) {
    await dispatch(deleteCheckin(id));
  }
  function updateCheckin(update) {
    dispatch(editCheckin(id, update));
  }
  useSelector((state) => state.checkins);
  let url = location.pathname;
  let isProfile = url.endsWith("profile");

  let formattedComments = [];
  if (sessionUser) {
    let selfComments = Comments?.filter(
      ({ owner_id }) => +owner_id === +sessionUser.id
    );
    let otherComments = Comments?.filter(
      ({ owner_id }) => +owner_id !== +sessionUser.id
    ).reverse();
    if (selfComments) formattedComments = [...selfComments];
    if (otherComments)
      formattedComments = [...formattedComments, ...otherComments];
  } else {
    formattedComments = Comments?.reverse();
  }
  function stars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - i !== 0.5 && rating - i > 0) {
        stars.push(<span className="material-icons">star</span>);
      } else if (rating - i === 0.5) {
        stars.push(<span className="material-icons">star_half</span>);
      } else {
        stars.push(<span class="material-icons">star_border</span>);
      }
    }
    return stars;
  }

  return (
    <li>
      <div className="top">
        <img src={User?.profile_image} alt="" className="profileImage" />
        <div id="h3s">
          <h3>
            {User?.name ? User?.name : User?.username}
            <span>is drinking a</span>
            {Drink?.name}
          </h3>
          {checkinLocation && (
            <h3>
              <span>at</span>
              {checkinLocation}
            </h3>
          )}
        </div>
        <div className="starRating">{stars(+rating)}</div>
      </div>
      {sessionUser?.id === owner_id && isProfile ? (
        <div id="descriptionDiv">
          <input
            type="text"
            name="description"
            id="descriptionfield"
            value={updateDisc || description}
            onChange={(e) => setUpdateDisc(e.target.value)}
          />
          <button
            className="update"
            onClick={(e) => updateCheckin(updateDisc)}
            disabled={description === updateDisc}
          >
            update
          </button>
        </div>
      ) : (
        <div id="descriptionDiv">{description}</div>
      )}
      <img src={image} alt="" className="checkinImage" />

      <ul
        id="commentContainer"
        style={expand ? { height: "fit-content" } : { height: "110px" }}
      >
        {formattedComments.map(({ id, content, User }) => (
          <Comment key={id} data={{ id, content, User }} />
        ))}
      </ul>
      {formattedComments.length && (
        <h4
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? "Collapse" : "Expand"}
        </h4>
      )}
      <CommentForm checkinId={id} />
      {sessionUser?.id === owner_id && isProfile && (
        <div id="deleteContainer">
          <button
            className="deleteButton"
            onClick={() => deleteCheckinAction(id)}
          >
            Delete Checkin
          </button>
        </div>
      )}
    </li>
  );
}
```

### Redux Store ([React-Redux](https://react-redux.js.org/))

Redux is used to keep a site wide state for the current logged in user and all game listings.  On application start Redux stores all drinks, while this causes initial load time to be longer it allows for a fast experience with drinks after initial load.  

Part of the Redux state tree:

![image](https://user-images.githubusercontent.com/16979047/148470314-59e91268-12bf-4a87-a9ac-2bb93dc8d5a4.png)

Redux uses Thunks to communicate to the backend and then change state with an Action based on the response

Thunk for `POST` listing:
```js
// in frontend/src/store/checkins.js
export const postCheckin = (checkin) => async (dispatch) => {
  const response = await csrfFetch("/api/checkins", {
    method: "POST",
    body: JSON.stringify(checkin),
  });
  let newCheckin = await response.json();
  dispatch(add(newCheckin));
  return newCheckin;
};
```
Action dispatched with data from the response from server:
```js
// in frontend/src/store/checkins.js
const add = (checkin) => ({
  type: ADDCHECKIN,
  checkin,
});
```
