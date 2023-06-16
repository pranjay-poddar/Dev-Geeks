defmodule CounterWeb.PageLiveTest do
  use CounterWeb.ConnCase
  import Phoenix.LiveViewTest

  test "disconnected and connected render", %{conn: conn} do
    {:ok, page_live, disconnected_html} = live(conn, "/")
    assert disconnected_html =~ "0"
    assert render(page_live) =~ "0"
end

test "increment event and decrement", %{conn: conn} do
  {:ok, page_live, _html} = live(conn, "/")
  assert render_click(page_live, :inc, %{}) =~ "1"
  assert render_click(page_live, :inc, %{}) =~ "2"
  assert render_click(page_live, :inc, %{}) =~ "3"
  assert render_click(page_live, :dec, %{}) =~ "2"
  assert render_click(page_live, :dec, %{}) =~ "1"
  assert render_click(page_live, :dec, %{}) =~ "0"
end

test "clear event", %{conn: conn} do
  {:ok, page_live, _html} = live(conn, "/")
  assert render_click(page_live, :inc, %{}) =~ "1"
  assert render_click(page_live, :clear, %{}) =~ "0"
end
end
