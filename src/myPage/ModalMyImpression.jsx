import BookImage from "../impression/BookImage";
import BookInfo from "../impression/BookInfo";
import Button from "./Button";

const ModalMyImpression = ({ book, onClose }) => {
    const handleClick = () => {
        alert('Button was clicked!');
      };
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
            <Button onClick={handleClick} label="삭제" />
            <Button onClick={handleClick} label="수정" />
            </div>
        </div>
    </div>
  );
};

export default ModalMyImpression;
