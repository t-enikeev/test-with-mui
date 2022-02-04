function ImageCard(props) {
  return (
    <div className="ImageCard" onClick={() => props.onClick(props.item)}>
      <img
        className="ImageCard__Img"
        src={props.item.thumbnailUrl}
        alt={props.item.title}
      />
      <p className="ImageCard__Title">{props.item.title}</p>
      <span className="ImageCard__Album">AlbumID: {props.item.albumId}</span>
    </div>
  );
}
export default ImageCard;
