import { ApiCallPut } from "../components/Api/ApiCall";

export const votesUpdate = async (api, voteStatus) => {
  await ApiCallPut(`${api}`, { vote: voteStatus })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.text);
    });
};

export const handleVote = (
  upVoted,
  downVoted,
  votes,
  setVotesNumber,
  setUpVoted,
  setDownVoted,
  setVoteStatus,
  setInitialRender,

  check
) => {
  if (upVoted && check === "upvote") {
    setVotesNumber(votes - 1);
    setUpVoted(false);
    setVoteStatus("neutral");
  } else if (!upVoted && check === "upvote") {
    setVotesNumber((prevVote) => prevVote + 1);
    setUpVoted(true);
    setDownVoted(false);
    setVoteStatus("upvote");
  } else if (upVoted && check === "downvote") {
    setVotesNumber(votes - 2);
    setUpVoted(false);
    setDownVoted(true);
    setVoteStatus("downvote");
  } else if (downVoted && check === "downvote") {
    setVotesNumber(votes + 1);
    setDownVoted(false);
    setVoteStatus("neutral");
  } else if (!downVoted && check === "downvote") {
    setVotesNumber((prevVote) => prevVote - 1);
    setDownVoted(true);
    setUpVoted(false);
    setVoteStatus("downvote");
  } else if (downVoted && check === "upvote") {
    setVotesNumber(votes + 2);
    setUpVoted(true);
    setDownVoted(false);
    setVoteStatus("upvote");
  }

  setInitialRender(false);
};
