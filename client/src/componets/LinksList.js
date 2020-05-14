import React from 'react'
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Original link</th>
                    <th>Shorten link</th>
                    <th>Count click</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>{link.clicks}</td>
                            <td>
                                <Link to={`detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}