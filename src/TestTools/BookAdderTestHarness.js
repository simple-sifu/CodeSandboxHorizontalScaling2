import booksRepository from "../Books/BooksRepository";
import Observable from "../Shared/Observable";
import GetPublicBooksStub from "../TestTools/GetPublicBooksStub";
import BookListPresenter from "../Books/BookListPresenter";
import AddBooksPresenter from "../Books/AddBooksPresenter";
import httpGateway from "../Shared/HttpGateway";

export default class BookAdderTestHarness {
  async init(callback) {
    jest.clearAllMocks();
    booksRepository.booksPm = new Observable([]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return GetPublicBooksStub();
    });
    await new BookListPresenter().load(callback);
  }

  async addBook() {
    jest.clearAllMocks();
    httpGateway.post = jest.fn();
    const pivotedStub = GetPublicBooksStub();
    pivotedStub.result.push(pivotedStub.result[2]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });
    const addBooksPresenter = new AddBooksPresenter();
    await addBooksPresenter.addBook("UFT", "Pete Heard");
  }
}
