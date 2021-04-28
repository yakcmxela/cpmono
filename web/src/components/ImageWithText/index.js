const ImageWithText = ({ id, markupId, content, image }) => {
  return (
    <section id={markupId}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {image && <img src={image.url} />}
    </section>
  );
};
export default ImageWithText;
