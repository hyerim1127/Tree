import BookImage from "./impression/BookImage";
import BookInfo from "./impression/BookInfo";

const ModalImpressionReason = ({ book, onClose }) => {
  return (
    <div className="I-modal">
      <div className="I-modal-reason-content">
        <span className="I-modal-close" onClick={onClose}>&times;</span>

        <div className="I-modal-body">
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div className="I-book-image">
              <BookImage src={book.image} />
            </div>
            <div className="I-book-info">
              <BookInfo 
                title={book.title} 
                author={book.author} 
                description={book.description} 
              />
            </div>
          </div>
          <div className="I-book-reason">
            {book.reason}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImpressionReason;
