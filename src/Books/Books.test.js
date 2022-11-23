import httpGateway from "../Shared/HttpGateway";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("add book", () => {
  it("should call api", async () => {
    await new BookAdderTestHarness().addBook();

    expect(httpGateway.post).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books",
      {
        author: "Pete Heard",
        name: "UFT",
        ownerId: "tommy.han.cs@gmail.com"
      }
    );
  });
  it("should load and reload books", async () => {
    // anchor
    let viewModel = null;
    await new BookAdderTestHarness().init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books"
    );
    expect(viewModel).toHaveLength(5);
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[4].name).toBe("The Hobbit");

    // pivot

    await new BookAdderTestHarness().addBook();

    expect(
      httpGateway.post
    ).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books",
      { author: "Pete Heard", name: "UFT", ownerId: "tommy.han.cs@gmail.com" }
    );

    expect(viewModel).toHaveLength(6);
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[4].name).toBe("The Hobbit");
    expect(viewModel[5].name).toBe("Wind in the willows");
  });
});
