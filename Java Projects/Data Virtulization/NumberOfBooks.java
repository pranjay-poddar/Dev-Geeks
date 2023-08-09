/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import org.knowm.xchart.CategoryChart;
import org.knowm.xchart.CategoryChartBuilder;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.Styler;
import static org.knowm.xchart.style.Styler.LegendPosition.OutsideS;

public class NumberOfBooks implements ExampleChart<CategoryChart>
{
    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  public XChartPanel getPanel(){

    ExampleChart<CategoryChart> exampleChart = new NumberOfBooks();
    CategoryChart chart = exampleChart.getChart();
    
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }

  @Override
  public CategoryChart getChart() {

    // Create Chart
    CategoryChart chart =
        new CategoryChartBuilder()
            .width(1366)
            .height(748)
            .title("BOOKS PURCHASED EVERY YEAR")
            .xAxisTitle("YEAR")
            .yAxisTitle("NUMBER OF BOOKS")
            .theme(Styler.ChartTheme.Matlab)
            .build();

    // Customize Chart
    chart.getStyler().setPlotGridVerticalLinesVisible(false);
    chart.getStyler().setStacked(true);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    chart.getStyler().setPlotGridLinesVisible(false);
    chart.getStyler().setLegendPosition(OutsideS);
    chart.getStyler().setXAxisLabelRotation(45);
    // Series
    ArrayList<String> a = new ArrayList<>();
    ArrayList<Double> b = new ArrayList<>();
    Connection con = DbConnect.getConnection();
    int i = 0;
    try
    {
        Statement statement = null;
        statement = con.createStatement();
        ResultSet rs = statement.executeQuery("SELECT * FROM numberofbooks");
        while(rs.next())
        {
            a.add(rs.getString("year"));
            b.add(Double.parseDouble(rs.getString("numberofbooks")));
            i++;
        }
    }catch(NumberFormatException | SQLException e)
    {
        System.out.println(e);
    }
    chart.addSeries("NUMBER OF BOOKS PURCHASED BY LIBRARY EVERY YEAR",a,b);
    return chart;
  }
}