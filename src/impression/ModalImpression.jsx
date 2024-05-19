import BookImage from "./BookImage";
import BookInfo from "./BookInfo";
import ToggleDetail from "./ToggleDetail";

const ModalImpression = ({ book, onClose }) => {

    return (
      <div className="I-modal">
        <div className="I-modal-content">
          <span className="I-modal-close" onClick={onClose}>&times;</span>

          <div className="I-modal-body">
            <div style={{display: 'flex', alignItems: 'stretch',}}>
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
            <div className="toggle-sections">
              {book.details.map((detail, index) => (
                <ToggleDetail key={index} detail={detail} />
              ))}
            </div>
          </div>

        </div>
      </div>
  
    );
  };

  export default ModalImpression;