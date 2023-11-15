import { friends } from "../models/friends.model.js";

export function postFriends(req, res) {
  if (!req.body.name) {
    res.status(400).json({
      error: "Missing friends name",
    });
  } else {
    const newFriend = {
      name: req.body.name,
      id: friends.length,
    };
    friends.push(newFriend);
    res.json(friends);
  }
}

export function getFriend(req, res) {
  const friendID = req.params.friendId;
  const friend = friends[friendID];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
}

export function getFriends(req, res) {
  res.json(friends);
}
