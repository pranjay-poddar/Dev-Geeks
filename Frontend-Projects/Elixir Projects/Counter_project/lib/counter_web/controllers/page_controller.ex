defmodule CounterWeb.PageController do
  use CounterWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
